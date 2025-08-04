# 📚 Read Journey

**Read Journey**, kullanıcıların kitap okuma alışkanlıklarını dijital ortamda planlayabileceği, kitap günlüğü tutabileceği ve okuma hedeflerine ulaşabileceği modern bir uygulamadır. React + Redux Toolkit altyapısıyla geliştirilmiş olup, REST API ile dinamik olarak çalışır.

[![Static Badge](https://img.shields.io/badge/visit-Read%20Journey-%236C63FF?style=for-the-badge)](https://read-journey-peach.vercel.app/)

## ![alt](/public/img/ReadJourney%20Readme.png)

---

## 📌 Özellikler

- 🔐 Kullanıcı kayıt ve giriş sistemi (JWT ile doğrulama)
- 📚 Kitap listesi görüntüleme (önerilen kitaplar)
- ➕ Kütüphaneye kitap ekleme / silme
- ⏳ Okuma başlatma ve ilerleme takibi
- 📓 Günlük (diary) oluşturma
- 📊 Okuma istatistiklerini grafikle analiz etme
- ✅ Responsive ve mobil uyumlu arayüz
- 📁 Redux Persist ile local storage desteği

---

## 🧩 Kullanılan Teknolojiler

| Teknoloji        | Açıklama                                  |
|------------------|-------------------------------------------|
| React            | Bileşen tabanlı kullanıcı arayüzü         |
| Redux Toolkit    | Global state yönetimi                     |
| Redux Persist    | Tarayıcıda veri saklama                   |
| React Router DOM | Sayfa yönlendirme                         |
| React Hook Form  | Form yönetimi ve doğrulama (Yup ile)      |
| Axios            | API istekleri                             |
| Chart.js         | Grafiksel istatistik gösterimi            |
| Tailwind CSS     | Hızlı ve özelleştirilebilir UI tasarımı   |
| Formik & YUP     | Form yönetimi ve doğrulama                |
| Toastify         | Bildirim sistemi                          |
| Vite             | Geliştirme ortamı                         |
| REST API         | Backend bağlantısı (Swagger tabanlı)      |

---

## 🧭 Sayfa Yapısı

| Sayfa           | Rota           | Açıklama                            |
|-----------------|----------------|-------------------------------------|
| Giriş           | `/login`       | Kullanıcı girişi                    |
| Kayıt           | `/register`    | Yeni kullanıcı oluşturma            |
| Önerilen Kitaplar | `/recommended` | Kullanıcıya özel öneri listesi      |
| Kütüphane       | `/library`     | Kullanıcının kişisel kitaplığı      |
| Okuma Sayfası   | `/reading`     | Okuma hedefi ve ilerleme takibi     |

---

## 🔐 API ve Yetkilendirme

- Kimlik doğrulama: JWT Token ile
- API dokümantasyonu: [Swagger](https://readjourney.b.goit.study/api-docs/)
- Tüm istekler Axios ile yapılır.

---

## 👤 Geliştirici

### 👩‍💻 Heza Gölcük

<p align="left">
  <a href="https://github.com/Hezaarfenn" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Badge"/>
  </a>
  <a href="https://www.linkedin.com/in/heza-g%C3%B6lc%C3%BCk-8a2279312/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
</p>

---

📝 Lisans

Bu proje eğitim amaçlıdır ve açık kaynak değildir.

---

⭐️ “Her kitap bir yolculuktur; Read Journey ile yolun hep açık olsun.” 📖
