export type Division = {
  code: string
  name: string
}

export type District = {
  code: string
  name: string
  divisionCode: string
}

export type Upazila = {
  code: string
  name: string
  districtCode: string
}

export const divisions: Division[] = [
  { code: 'DHA', name: 'Dhaka' },
  { code: 'CTG', name: 'Chattogram' },
  { code: 'RAJ', name: 'Rajshahi' },
  { code: 'KHU', name: 'Khulna' },
  { code: 'BAR', name: 'Barishal' },
  { code: 'SYL', name: 'Sylhet' },
  { code: 'RAN', name: 'Rangpur' },
  { code: 'MYM', name: 'Mymensingh' },
]

// Minimal sample; can be extended or sourced from backend later
export const districts: District[] = [
  { code: 'DHA-DHA', name: 'Dhaka', divisionCode: 'DHA' },
  { code: 'DHA-GAZ', name: 'Gazipur', divisionCode: 'DHA' },
  { code: 'CTG-CTG', name: 'Chattogram', divisionCode: 'CTG' },
  { code: 'CTG-COX', name: "Cox's Bazar", divisionCode: 'CTG' },
]

export const upazilas: Upazila[] = [
  { code: 'DHA-DHA-SAV', name: 'Savar', districtCode: 'DHA-DHA' },
  { code: 'DHA-GAZ-KAP', name: 'Kapasia', districtCode: 'DHA-GAZ' },
  { code: 'CTG-CTG-PAH', name: 'Pahartali', districtCode: 'CTG-CTG' },
  { code: 'CTG-COX-TEC', name: 'Teknaf', districtCode: 'CTG-COX' },
]
