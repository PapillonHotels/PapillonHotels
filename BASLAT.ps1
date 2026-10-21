$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath($PSScriptRoot)
$listener = $null
foreach ($port in 8080..8090) {
  try {
    $listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $port)
    $listener.Start()
    break
  } catch { $listener = $null }
}
if ($null -eq $listener) { throw '8080-8090 portlari kullanimda. Diger yerel sunucuyu kapatip yeniden deneyin.' }
$url = "http://127.0.0.1:$port/"
Write-Host "Papillon Hotels: $url"
Write-Host 'Site acikken bu pencereyi acik birakin. Durdurmak icin pencereyi kapatin.'
Start-Process $url
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.json'='application/json; charset=utf-8'; '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.webp'='image/webp'; '.mp4'='video/mp4'; '.mp3'='audio/mpeg'; '.woff2'='font/woff2'; '.ico'='image/x-icon' }
try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $stream.ReadTimeout = 5000
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 4096, $true)
      $line = $reader.ReadLine()
      if (-not $line) { continue }
      $request = $line.Split(' ')
      $range = $null
      while ($true) {
        $header = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($header)) { break }
        if ($header -match '^Range:\s*bytes=(\d+)-(\d*)') { $range = @($Matches[1], $Matches[2]) }
      }
      $relative = [Uri]::UnescapeDataString(($request[1].Split('?')[0])).TrimStart('/')
      if (-not $relative) { $relative = 'index.html' }
      $file = [IO.Path]::GetFullPath([IO.Path]::Combine($root, $relative.Replace('/', [IO.Path]::DirectorySeparatorChar)))
      $safe = $file.StartsWith($root + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)
      $body = $null
      if (-not $safe -or -not [IO.File]::Exists($file)) {
        $body = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $response = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      } else {
        $body = [IO.File]::ReadAllBytes($file)
        $mime = $types[[IO.Path]::GetExtension($file).ToLowerInvariant()]
        if (-not $mime) { $mime = 'application/octet-stream' }
        $start = 0L; $end = $body.LongLength - 1
        $status = '200 OK'; $extra = ''
        if ($range -and [long]$range[0] -lt $body.LongLength) {
          $start = [long]$range[0]
          if ($range[1]) { $end = [Math]::Min([long]$range[1], $end) }
          if ($end -lt $start) { $end = $body.LongLength - 1 }
          $status = '206 Partial Content'
          $extra = "Content-Range: bytes $start-$end/$($body.LongLength)`r`n"
        }
        $length = $end - $start + 1
        $response = "HTTP/1.1 $status`r`nContent-Type: $mime`r`nContent-Length: $length`r`nAccept-Ranges: bytes`r`nCache-Control: no-cache`r`n$extra" + "Connection: close`r`n`r`n"
      }
      $bytes = [Text.Encoding]::ASCII.GetBytes($response)
      $stream.Write($bytes, 0, $bytes.Length)
      if ($request[0] -ne 'HEAD') {
        if ($response.StartsWith('HTTP/1.1 404')) { $stream.Write($body, 0, $body.Length) }
        else { $stream.Write($body, [int]$start, [int]$length) }
      }
      $stream.Flush()
    } catch { Write-Host 'Baglanti yeniden denenebilir.' }
    finally { $client.Close() }
  }
} finally { $listener.Stop() }
