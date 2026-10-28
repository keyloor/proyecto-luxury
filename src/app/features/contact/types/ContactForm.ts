export interface ContactFormData {
  name: string
  email: string
  phone: string
  property: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  property?: string
  message?: string
}
