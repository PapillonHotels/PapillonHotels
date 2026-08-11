# Papillon Hotels - QR Menü

## GitHub Pages kurulumu

1. GitHub'da yeni bir repository oluştur.
2. Bu klasördeki dosyaları repository'nin ana dizinine yükle.
3. `pdf` klasörünü oluştur ve 4 PDF'yi içine koy:
   - `sarap-menusu.pdf`
   - `yemek-menusu.pdf`
   - `kokteyl-menusu.pdf`
   - `icecek-menusu.pdf`
4. Repository > **Settings > Pages**
5. **Deploy from a branch** seç.
6. Branch olarak `main`, klasör olarak `/ (root)` seç ve kaydet.
7. GitHub sana `https://kullaniciadi.github.io/repository-adi/` şeklinde bir adres verecek.
8. QR kodu bu adrese yönlendir.

## PDF linklerini değiştirme

`index.html` içinde her butonun `href="pdf/....pdf"` kısmını değiştirebilirsin.

Örnek:
`href="pdf/yeni-sarap-listesi.pdf"`

## Logo

`logo.png` dosyası Papillon Hotels logosudur.
