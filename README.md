# San Pedro Kahve Oyunu ☕

San Pedro logosunu kullanarak kahve çeşitleri görselleriyle "3 aynı kahveyi bul, 1 kahve kazan" konseptinde etkileşimli bir web oyunu.

## Oyun Özellikleri

- **3 Kahve Çeşidi**: Espresso, Latte, Cappuccino
- **9 Kart Sistemi**: Her kahveden 3 adet kart (3x3 grid)
- **San Pedro Logosu**: Her kahve görseli San Pedro logosu içeriyor
- **Puan Sistemi**: Her başarılı eşleştirmede puan artışı
- **Kazanma Ekranı**: Tüm kahveleri eşleştirdiğinde kutlama mesajı
- **Responsive Tasarım**: Mobil ve masaüstü cihazlarda mükemmel görünüm
- **Amber/Turuncu Tema**: Kahve markasına uygun sıcak renk paleti

## Oyun Mekanikası

1. Oyuncu 3 kartı sırasıyla tıklar
2. Eğer üçü de aynı kahve çeşidiyse, kartlar kalıcı olarak açık kalır ve puan artar
3. Farklı kahveler açılırsa, 1 saniye sonra otomatik olarak kapatılır
4. Tüm kahveleri eşleştirdiğinde oyun biter ve kazanma ekranı gösterilir

## Teknoloji Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Build Tool**: Vite

## Kurulum

```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev

# Üretim için derle
pnpm build
```

## Proje Yapısı

```
san_pedro_coffee_game/
├── client/
│   ├── public/          # Statik dosyalar (kahve görselleri)
│   ├── src/
│   │   ├── pages/       # Sayfa bileşenleri
│   │   ├── components/  # Yeniden kullanılabilir bileşenler
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Yardımcı fonksiyonlar
│   │   ├── App.tsx      # Ana uygulama
│   │   └── main.tsx     # Entry point
│   └── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Kahve Görselleri

Oyunda kullanılan kahve görselleri:
- `espresso_branded.png` - Espresso
- `latte_branded.png` - Latte
- `cappuccino_branded.png` - Cappuccino

Tüm görseller San Pedro logosu içermektedir.

## Lisans

Bu proje San Pedro Kahve Markası için geliştirilmiştir.

## Geliştirici

Manus AI tarafından geliştirilmiştir.
