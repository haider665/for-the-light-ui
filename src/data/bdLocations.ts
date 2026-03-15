export type BdDistrict = {
  name: string
  upazilas: string[]
}

export type BdDivision = {
  name: string
  districts: BdDistrict[]
}

export const BD_DATA: { divisions: BdDivision[] } = {
  divisions: [
    {
      name: 'Dhaka',
      districts: [
        { name: 'Dhaka', upazilas: ['Dhamrai', 'Dohar', 'Keraniganj', 'Nawabganj', 'Savar'] },
        { name: 'Faridpur', upazilas: ['Alfadanga', 'Bhanga', 'Boalmari', 'Charbhadrasan', 'Faridpur Sadar', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'] },
        { name: 'Gazipur', upazilas: ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Sreepur'] },
        { name: 'Gopalganj', upazilas: ['Gopalganj Sadar', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'] },
        { name: 'Kishoreganj', upazilas: ['Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna', 'Karimganj', 'Katiadi', 'Kishoreganj Sadar', 'Kuliarchar', 'Mithamain', 'Nikli', 'Pakundia', 'Tarail'] },
        { name: 'Madaripur', upazilas: ['Kalkini', 'Madaripur Sadar', 'Rajoir', 'Shibchar'] },
        { name: 'Manikganj', upazilas: ['Daulatpur', 'Ghior', 'Harirampur', 'Manikganj Sadar', 'Saturia', 'Shivalaya', 'Singair'] },
        { name: 'Munshiganj', upazilas: ['Gazaria', 'Lohajang', 'Munshiganj Sadar', 'Sirajdikhan', 'Sreenagar', 'Tongibari'] },
        { name: 'Narayanganj', upazilas: ['Araihazar', 'Bandar', 'Narayanganj Sadar', 'Rupganj', 'Sonargaon'] },
        { name: 'Narsingdi', upazilas: ['Belabo', 'Monohardi', 'Narsingdi Sadar', 'Palash', 'Raipura', 'Shibpur'] },
        { name: 'Rajbari', upazilas: ['Baliakandi', 'Goalanda', 'Kalukhali', 'Pangsha', 'Rajbari Sadar'] },
        { name: 'Shariatpur', upazilas: ['Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Shariatpur Sadar', 'Zajira'] },
        { name: 'Tangail', upazilas: ['Basail', 'Bhuapur', 'Delduar', 'Dhanbari', 'Ghatail', 'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur', 'Tangail Sadar'] },
      ],
    },
    {
      name: 'Barishal',
      districts: [
        { name: 'Barguna', upazilas: ['Amtali', 'Bamna', 'Barguna Sadar', 'Betagi', 'Patharghata', 'Taltali'] },
        { name: 'Barishal', upazilas: ['Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Barishal Sadar', 'Gournadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'] },
        { name: 'Bhola', upazilas: ['Bhola Sadar', 'Borhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'] },
        { name: 'Jhalokathi', upazilas: ['Jhalokathi Sadar', 'Kathalia', 'Nalchity', 'Rajapur'] },
        { name: 'Patuakhali', upazilas: ['Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Patuakhali Sadar', 'Rangabali'] },
        { name: 'Pirojpur', upazilas: ['Bhandaria', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Nesarabad (Swarupkathi)', 'Pirojpur Sadar'] },
      ],
    },
    {
      name: 'Sylhet',
      districts: [
        { name: 'Habiganj', upazilas: ['Ajmiriganj', 'Bahubal', 'Baniachong', 'Chunarughat', 'Habiganj Sadar', 'Lakhai', 'Madhabpur', 'Nabiganj'] },
        { name: 'Moulvibazar', upazilas: ['Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Moulvibazar Sadar', 'Rajnagar', 'Sreemangal'] },
        { name: 'Sunamganj', upazilas: ['Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Sullah', 'Sunamganj Sadar', 'Tahirpur'] },
        { name: 'Sylhet', upazilas: ['Balaganj', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Dakshin Surma', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Sylhet Sadar', 'Zakiganj'] },
      ],
    },
    {
      name: 'Chattogram',
      districts: [
        { name: 'Bandarban', upazilas: ['Alikadam', 'Bandarban Sadar', 'Lama', 'Naikhongchhari', 'Rowangchhari', 'Ruma', 'Thanchi'] },
        { name: 'Brahmanbaria', upazilas: ['Akhaura', 'Ashuganj', 'Banchharampur', 'Bijoynagar', 'Brahmanbaria Sadar', 'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail'] },
        { name: 'Chandpur', upazilas: ['Chandpur Sadar', 'Faridganj', 'Haimchar', 'Hajiganj', 'Kachua', 'Matlab Dakshin', 'Matlab Uttar', 'Shahrasti'] },
        { name: 'Chattogram', upazilas: ['Anwara', 'Banshkhali', 'Boalkhali', 'Chandanaish', 'Fatikchhari', 'Hathazari', 'Lohagara', 'Mirsharai', 'Pahartali', 'Patiya', 'Rangunia', 'Raozan', 'Sandwip', 'Satkania', 'Sitakunda'] },
        { name: "Cox's Bazar", upazilas: ['Chakaria', "Cox's Bazar Sadar", 'Kutubdia', 'Maheshkhali', 'Pekua', 'Ramu', 'Teknaf', 'Ukhia'] },
        { name: 'Cumilla', upazilas: ['Barura', 'Brahmanpara', 'Burichang', 'Chandina', 'Chauddagram', 'Cumilla Sadar', 'Daudkandi', 'Debidwar', 'Homna', 'Laksam', 'Monohargonj', 'Muradnagar', 'Nangalkot', 'Titas'] },
        { name: 'Feni', upazilas: ['Chhagalnaiya', 'Daganbhuiyan', 'Feni Sadar', 'Fulgazi', 'Parshuram', 'Sonagazi'] },
        { name: 'Khagrachhari', upazilas: ['Dighinala', 'Khagrachhari Sadar', 'Lakshmichhari', 'Mahalchhari', 'Manikchhari', 'Matiranga', 'Panchhari', 'Ramgarh'] },
        { name: 'Lakshmipur', upazilas: ['Kamalnagar', 'Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati'] },
        { name: 'Noakhali', upazilas: ['Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Kabirhat', 'Noakhali Sadar', 'Senbagh', 'Sonaimuri', 'Subarnachar'] },
        { name: 'Rangamati', upazilas: ['Baghaichhari', 'Barkal', 'Bilaichhari', 'Juraichhari', 'Kaptai', 'Kawkhali', 'Langadu', 'Naniarchar', 'Rajasthali', 'Rangamati Sadar'] },
      ],
    },
    {
      name: 'Rajshahi',
      districts: [
        { name: 'Bogra', upazilas: ['Adamdighi', 'Bogra Sadar', 'Dhunat', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Shajahanpur', 'Sherpur', 'Shibganj', 'Sonatola'] },
        { name: 'Chapainawabganj', upazilas: ['Bholahat', 'Chapainawabganj Sadar', 'Gomastapur', 'Nachole', 'Shibganj'] },
        { name: 'Joypurhat', upazilas: ['Akkelpur', 'Joypurhat Sadar', 'Kalai', 'Khetlal', 'Panchbibi'] },
        { name: 'Naogaon', upazilas: ['Atrai', 'Badalgachhi', 'Dhamoirhat', 'Manda', 'Mohadevpur', 'Naogaon Sadar', 'Niamatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar'] },
        { name: 'Natore', upazilas: ['Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Natore Sadar', 'Singra'] },
        { name: 'Nawabganj', upazilas: ['Bholahat', 'Gomastapur', 'Nachole', 'Nawabganj Sadar', 'Shibganj'] },
        { name: 'Pabna', upazilas: ['Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur', 'Ishwardi', 'Pabna Sadar', 'Santhia', 'Sujanagar'] },
        { name: 'Rajshahi', upazilas: ['Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur', 'Paba', 'Puthia', 'Rajshahi Sadar', 'Tanore'] },
        { name: 'Sirajganj', upazilas: ['Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahzadpur', 'Sirajganj Sadar', 'Tarash', 'Ullahpara'] },
      ],
    },
    {
      name: 'Khulna',
      districts: [
        { name: 'Bagerhat', upazilas: ['Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola'] },
        { name: 'Chuadanga', upazilas: ['Alamdanga', 'Chuadanga Sadar', 'Damurhuda', 'Jibannagar'] },
        { name: 'Jessore', upazilas: ['Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jessore Sadar', 'Jhikargachha', 'Keshabpur', 'Manirampur', 'Sharsha'] },
        { name: 'Jhenaidah', upazilas: ['Harinakunda', 'Jhenaidah Sadar', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'] },
        { name: 'Khulna', upazilas: ['Batiaghata', 'Dacope', 'Dighalia', 'Dumuria', 'Khulna Sadar', 'Koyra', 'Paikgachha', 'Phultala', 'Rupsha', 'Terokhada'] },
        { name: 'Kushtia', upazilas: ['Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Kushtia Sadar', 'Mirpur'] },
        { name: 'Magura', upazilas: ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'] },
        { name: 'Meherpur', upazilas: ['Gangni', 'Meherpur Sadar', 'Mujibnagar'] },
        { name: 'Narail', upazilas: ['Kalia', 'Lohagara', 'Narail Sadar'] },
        { name: 'Satkhira', upazilas: ['Assasuni', 'Debhata', 'Kalaroa', 'Satkhira Sadar', 'Shyamnagar', 'Tala'] },
      ],
    },
    {
      name: 'Rangpur',
      districts: [
        { name: 'Dinajpur', upazilas: ['Birampur', 'Birganj', 'Bochaganj', 'Chirirbandar', 'Dinajpur Sadar', 'Fulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur'] },
        { name: 'Gaibandha', upazilas: ['Fulchhari', 'Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'] },
        { name: 'Kurigram', upazilas: ['Bhurungamari', 'Char Rajibpur', 'Chilmari', 'Kurigram Sadar', 'Nageshwari', 'Phulbari', 'Rajarhat', 'Raumari', 'Ulipur'] },
        { name: 'Lalmonirhat', upazilas: ['Aditmari', 'Hatibandha', 'Kaliganj', 'Lalmonirhat Sadar', 'Patgram'] },
        { name: 'Nilphamari', upazilas: ['Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Nilphamari Sadar', 'Saidpur'] },
        { name: 'Panchagarh', upazilas: ['Atwari', 'Boda', 'Debiganj', 'Panchagarh Sadar', 'Tentulia'] },
        { name: 'Rangpur', upazilas: ['Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj', 'Rangpur Sadar', 'Taraganj'] },
        { name: 'Thakurgaon', upazilas: ['Baliadangi', 'Horipur', 'Pirganj', 'Ranisankail', 'Thakurgaon Sadar'] },
      ],
    },
    {
      name: 'Mymensingh',
      districts: [
        { name: 'Jamalpur', upazilas: ['Bakshiganj', 'Dewanganj', 'Islampur', 'Jamalpur Sadar', 'Madarganj', 'Melandaha', 'Sarishabari'] },
        { name: 'Mymensingh', upazilas: ['Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Mymensingh Sadar', 'Nandail', 'Phulpur', 'Tarakanda', 'Trishal'] },
        { name: 'Netrokona', upazilas: ['Atpara', 'Barhatta', 'Durgapur', 'Kalmakanda', 'Kendua', 'Khaliajuri', 'Madan', 'Mohanganj', 'Netrokona Sadar', 'Purbadhala'] },
        { name: 'Sherpur', upazilas: ['Jhenaigati', 'Nakla', 'Nalitabari', 'Sherpur Sadar', 'Sreebardi'] },
      ],
    },
  ],
}

/** Flat list of division names */
export const divisionNames = BD_DATA.divisions.map(d => d.name).sort()

/** Get district names for a given division name */
export function getDistricts(divisionName: string): string[] {
  const div = BD_DATA.divisions.find(d => d.name === divisionName)
  return div ? div.districts.map(d => d.name).sort() : []
}

/** Get all district names (flat) */
export function getAllDistricts(): string[] {
  return BD_DATA.divisions.flatMap(d => d.districts.map(dist => dist.name)).sort()
}

/** Get upazila names for a given division + district name */
export function getUpazilas(divisionName: string, districtName: string): string[] {
  const div = BD_DATA.divisions.find(d => d.name === divisionName)
  const dist = div?.districts.find(d => d.name === districtName)
  return dist ? [...dist.upazilas].sort() : []
}

/** Get all upazila names (flat) */
export function getAllUpazilas(): string[] {
  return BD_DATA.divisions.flatMap(d => d.districts.flatMap(dist => dist.upazilas)).sort()
}

/** Get upazilas filtered by district name only (searches across all divisions) */
export function getUpazilasByDistrict(districtName: string): string[] {
  for (const div of BD_DATA.divisions) {
    const dist = div.districts.find(d => d.name === districtName)
    if (dist) return [...dist.upazilas].sort()
  }
  return []
}
