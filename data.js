export const meeting = {
  date:'Minggu, 29 November 2026',
  time:'20.00 WIB',
  airport:'Bandara Soekarno–Hatta · Terminal 3',
  spot:'Depan counter Bakerzin / Fore'
};

export const tourLeader = { name:'Aris Ardhianto', phone:'+62 818-0843-8826' };

export const hotels = {
  sokcho:{ name:'Chungchoho Best Hotel', dates:'30 November · Hari 2', address:'28, Cheongchohoban-ro, 24885 Sokcho, Korea Selatan', phone:'+82 33-800-8555' },
  seoul:{ name:'Bridge Hotel', dates:'1–4 Desember · Hari 3–6', address:'9 Yeongdeungpo-ro, Yeongdeungpo District, Seoul, Korea Selatan', phone:'+82 2-2629-1300' }
};

export const days = [
  { date:'29 Nov', weekday:'Min', icon:'plane', title:'Jakarta → Incheon', subtitle:'Penerbangan malam menuju Korea', flight:['GA 878 · Garuda Indonesia','CGK 23.30 WIB → ICN 08.30 KST (+1)'], stops:[
    ['Bandara Soekarno–Hatta','Berkumpul pukul 20.00 WIB di Terminal 3, depan counter Bakerzin / Fore, untuk penerbangan langsung menuju Incheon.']
  ] },
  { date:'30 Nov', weekday:'Sen', icon:'leaf', title:'Incheon → Pocheon → Nami → Mt. Sorak', subtitle:'Air terjun, ferry, dan suasana pegunungan', stops:[
    ['Incheon → Pocheon','Setelah mendarat, perjalanan dilanjutkan ke Pocheon.'],
    ['Bidulginang Falls','Air terjun di antara tebing batu vulkanik.'],
    ['Nami Island','Naik ferry ke pulau yang terkenal dengan deretan pohon dan lokasi drama Korea.'],
    ['Seoraksan National Park','Menuju area Seoraksan untuk bermalam.']
  ], hotel:'sokcho', transport:'Bus rombongan' },
  { date:'1 Des', weekday:'Sel', icon:'mountain', title:'Mt. Sorak → Seoul', subtitle:'Cable car, kelas kimbap, dan belanja', meal:true, stops:[
    ['Seoraksan National Park','Naik cable car untuk melihat panorama pegunungan.'],
    ['Gwongeumseong Fortress','Kunjungan ke benteng di kawasan Seoraksan.'],
    ['Sinheungsa Temple','Kunjungan ke kuil dan patung Buddha besar.'],
    ['Kelas membuat kimbap','Pengalaman membuat kimbap dalam rangkaian perjalanan menuju Seoul.'],
    ['Cheonggyecheon Stream','Melewati aliran sungai kota.'],
    ['Dongdaemun','Berbelanja di kawasan Dongdaemun.']
  ], hotel:'seoul', transport:'Bus rombongan' },
  { date:'2 Des', weekday:'Rab', icon:'building', title:'Seoul · Hanok & Hongdae', subtitle:'Desa tradisional, COEX, dan Hongdae', meal:true, stops:[
    ['Ginseng & Cosmetic Shopping Tour','Tur belanja ginseng dan kosmetik.'],
    ['Eunpyeong Hanok Village','Jelajahi desa tradisional Korea.'],
    ['Itaewon Mosque','Kunjungan ke masjid di Itaewon.'],
    ['COEX Mall & Starfield Library','Singgah di pusat belanja dan perpustakaan ikonik.'],
    ['Gangnam Style Statue','Berhenti untuk berfoto.'],
    ['Hongdae','Jelajahi kawasan Hongdae pada malam hari.']
  ], hotel:'seoul', transport:'Bus rombongan' },
  { date:'3 Des', weekday:'Kam', icon:'camera', title:'Seoul · Hanbok & N Seoul Tower', subtitle:'Istana, panorama kota, dan Myeongdong', meal:true, stops:[
    ['Amethyst Showcase & Red Pine Tree Shop','Tur belanja amethyst dan produk red pine.'],
    ['Gyeongbokgung Palace','Pengalaman memakai hanbok di istana.'],
    ['Blue House','Melewati Blue House.'],
    ['N Seoul Tower','Lihat panorama kota dan area love lock.'],
    ['Myeongdong & duty free','Berbelanja di Myeongdong dan toko duty free.']
  ], hotel:'seoul', transport:'Bus rombongan' },
  { date:'4 Des', weekday:'Jum', icon:'heart', title:'Seoul · Hari bebas', subtitle:'Jelajahi Seoul sesuai rencanamu', meal:true, stops:[
    ['Seoul','Hari bebas tanpa bus dan pemandu. Ide dari itinerary meliputi belanja, café hopping, dan mencari merchandise K-pop.']
  ], hotel:'seoul', transport:'Tanpa bus rombongan' },
  { date:'5 Des', weekday:'Sab', icon:'plane', title:'Seoul → Incheon → Jakarta', subtitle:'Penerbangan pulang ke Jakarta', meal:true, flight:['GA 879 · Garuda Indonesia','ICN 10.35 KST → CGK 16.00 WIB'], stops:[
    ['Incheon International Airport','Berangkat dari Seoul menuju bandara untuk penerbangan ke Jakarta.'],
    ['Jakarta → J Town','PDF menyebut penerbangan lanjutan ke J Town.']
  ], details:['Jam berangkat dari hotel','Detail penerbangan lanjutan'] },
];

export const packing = [
  ['Dokumen & uang', [
    ['passport','Paspor'],['visa','Visa atau dokumen masuk yang berlaku'],['copies','Salinan dokumen perjalanan'],['ticket','Tiket dan itinerary'],['won','Uang tunai KRW dan kartu']
  ]],
  ['Pakaian & perlengkapan', [
    ['layers','Jaket hangat atau sweater'],['shoes','Sepatu jalan nyaman'],['umbrella','Payung lipat'],['skincare','Sunscreen, topi, dan lotion'],['toiletries','Sikat gigi, odol, dan toiletries'],['bidet','Bidet portabel (opsional)'],['meds','Obat pribadi dan resep bila perlu']
  ]],
  ['Kabin & koneksi', [
    ['spare','Satu set baju ganti di kabin'],['liquids','Cairan kabin dalam kantong transparan'],['valuables','Paspor, uang, dan barang berharga di tas kabin'],['charger','Charger dan adaptor bila perlu'],['power','Power bank sesuai ketentuan maskapai'],['internet','Roaming, eSIM, atau pocket Wi-Fi'],['tag','Kunci koper dan identitas pemilik']
  ]]
];

export const guide = [
  ['leaf','Cuaca & pakaian','Panduan trip memperkirakan suhu −2 hingga 12°C dan sesekali hujan. Bawa pakaian berlapis, jaket hangat, sepatu nyaman, dan payung lipat. Topi, sunscreen, dan lotion juga disarankan. Cek prakiraan aktual menjelang berangkat.'],
  ['clock','Zona waktu','Korea Standard Time (KST) 2 jam lebih cepat dari WIB. Pukul 10.00 WIB sama dengan 12.00 KST. Jam penerbangan ditampilkan sesuai zona waktu masing-masing bandara.'],
  ['wallet','Uang & biaya pribadi','Mata uangnya won Korea (KRW). Panduan menyarankan menyiapkan KRW dari Indonesia atau membawa USD untuk ditukar. Referensi panduan per 27 Oktober 2026: 1 KRW ≈ Rp13,66, 1 USD ≈ 1.322 KRW atau Rp18.062. Cek kurs aktual sebelum menukar. Laundry, telepon, minibar, dan tur tambahan menjadi biaya pribadi. Lunasi biaya hotel sebelum check-out.'],
  ['bag','Bagasi & kabin','Panduan Pergi.com mencantumkan bagasi tercatat 30 kg dan satu tas kabin 7 kg untuk ekonomi Garuda. Cek jatah pada tiket. Cairan atau gel kabin maksimal 100 ml per kemasan dalam satu kantong bening tertutup maksimal 1 L. Biaya kelebihan bagasi ditanggung peserta.'],
  ['bolt','Power bank & barang terbatas','Panduan operator menyebut power bank hanya di kabin, sekitar maksimum 20.000 mAh, serta dilarang digunakan atau diisi daya selama penerbangan. Panduan juga menyebut larangan aerosol, tas AirWheel atau baterai tertanam, serta benda tajam di kabin. Cek kebijakan Garuda terbaru sebelum mengemas barang.'],
  ['heart','Makanan & obat','Makanan tur mengikuti itinerary. Panduan mengingatkan peserta agar menghindari membawa produk pertanian atau peternakan, seperti daging, rendang, abon, susu, keju, buah, kacang, dan ikan, serta sisa makanan pesawat. Cek aturan karantina Korea untuk barang bawaan. Bawa obat pribadi dan resep bila diperlukan.'],
  ['globe','Internet & peta','Siapkan roaming, eSIM, atau pocket Wi-Fi. Simpan alamat hotel dari bagian Hotel trip untuk berjaga-jaga saat mencari jalan pulang. Naver Map dan KakaoMap membantu mencari rute jalan kaki dan transportasi.'],
  ['bolt','Listrik & hotel','Korea memakai 220 V dengan colokan tipe C dan F. Panduan menyebut fasilitas dan ukuran kamar bisa lebih sederhana. Siapkan toiletries pribadi dan bidet portabel bila diinginkan.'],
  ['building','Permintaan kamar','Tipe ranjang, kamar berdekatan, preferensi merokok, dan extra bed tergantung ketersediaan saat check-in. Panduan menyarankan meminta extra bed jauh hari melalui operator.'],
  ['shield','Keamanan & imigrasi','Simpan paspor, uang, dan barang berharga di tas kabin. Hindari meninggalkan barang berharga di bus. Siapkan salinan dokumen perjalanan. Keputusan masuk tetap ditentukan petugas imigrasi. Panduan operator menyebut biaya kepulangan akibat penolakan masuk ditanggung peserta.'],
  ['wallet','Tip tur','Panduan Pergi.com mencantumkan USD 70 per peserta sebagai panduan tip layanan lokal untuk trip ini.'],
  ['train','Transportasi saat hari bebas','Untuk subway atau bus, pertimbangkan kartu transportasi T-money. Siapkan opsi rute pulang dan cek jam perjalanan terakhir di aplikasi peta.'],
  ['phone','Bantuan darurat','Di Korea, hubungi 112 untuk polisi, 119 untuk kebakaran atau ambulans, atau 1330 untuk bantuan wisata Korea Travel Hotline.']
];

export const links = [
  ['Peta & transportasi',[
    ['Naver Map','Rute jalan kaki, subway, dan bus','https://map.naver.com/','pin'],
    ['KakaoMap','Alternatif peta dan pencarian lokasi','https://map.kakao.com/','pin'],
    ['Papago','Terjemahan Korea, termasuk teks dari kamera','https://papago.naver.com/','globe']
  ]],
  ['Info resmi & inspirasi',[
    ['VISITKOREA','Panduan wisata resmi Korea','https://english.visitkorea.or.kr/','globe'],
    ['Korea Tourism Organization','Instagram resmi untuk inspirasi wisata','https://www.instagram.com/visitkorea_travel/','camera'],
    ['Garuda Indonesia','Informasi penerbangan dan ketentuan bagasi','https://www.garuda-indonesia.com/','plane'],
    ['Incheon Airport','Informasi terminal dan layanan bandara','https://www.airport.kr/','plane'],
    ['KBRI Seoul','Informasi dan layanan WNI di Korea','https://kemlu.go.id/seoul','shield']
  ]]
];
