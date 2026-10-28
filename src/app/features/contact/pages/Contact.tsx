import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../../shared/hooks/useFetch'
import type { Apartment } from '../../apartments/types/Apartment'
import type { ContactFormData, ContactFormErrors } from '../types/ContactForm'
import '../styles/Contact.css'

const GENERAL_QUERY = 'Consulta general'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9]{8}$/

const validate = (form: ContactFormData) => {
  const errors: ContactFormErrors = {}

  if (form.name.trim() === '') {
    errors.name = 'Escribí tu nombre.'
  } else if (form.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 letras.'
  }

  if (form.email.trim() === '') {
    errors.email = 'Escribí tu correo.'
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'El correo no es válido. Ejemplo: nombre@correo.com'
  }

  if (form.phone.trim() !== '' && !PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = 'El teléfono debe tener 8 números, sin espacios ni guiones.'
  }

  if (form.property === '') {
    errors.property = 'Elegí una propiedad o «Consulta general».'
  }

  if (form.message.trim() === '') {
    errors.message = 'Escribí tu mensaje.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  } else if (form.message.length > 500) {
    errors.message = 'El mensaje no puede pasar de 500 caracteres.'
  }

  return errors
}

const Contact = () => {
  const [searchParams] = useSearchParams()
  const { data } = useFetch<Apartment[]>('/data/apartments.json')

  const initialForm: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    property: searchParams.get('propiedad') ?? '',
    message: '',
  }

  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [sentName, setSentName] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: undefined })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newErrors = validate(form)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setSentName('')
      return
    }

    setSentName(form.name.trim())
    setForm({ ...initialForm, property: '' })
  }

  const propertyNames = data ? data.map((apartment) => apartment.name) : []

  if (form.property !== '' && form.property !== GENERAL_QUERY && !propertyNames.includes(form.property)) {
    propertyNames.unshift(form.property)
  }

  return (
    <section className="container page-section contact">
      <h1 className="contact-title">Contacto</h1>
      <p className="contact-intro">
        ¿Te interesa un apartamento? Dejanos tus datos y te escribimos para coordinar una visita.
      </p>

      <p className="contact-notice">
        Este formulario es una simulación: los datos no se envían a ningún lado.
      </p>

      {sentName !== '' && (
        <p className="contact-success" role="status">
          ¡Gracias, {sentName}! Recibimos tu mensaje (envío simulado).
        </p>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? true : false}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="contact-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? true : false}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="contact-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="phone">
            Teléfono <span className="contact-optional">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? true : false}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <p id="phone-error" className="contact-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="property">Propiedad</label>
          <select
            id="property"
            name="property"
            value={form.property}
            onChange={handleChange}
            aria-invalid={errors.property ? true : false}
            aria-describedby="property-error"
          >
            <option value="">Elegí una opción</option>
            <option value={GENERAL_QUERY}>{GENERAL_QUERY}</option>
            {propertyNames.map((propertyName) => (
              <option key={propertyName} value={propertyName}>
                {propertyName}
              </option>
            ))}
          </select>
          {errors.property && (
            <p id="property-error" className="contact-error">
              {errors.property}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            aria-invalid={errors.message ? true : false}
            aria-describedby="message-error"
          />
          <p className="contact-counter">{form.message.length} / 500</p>
          {errors.message && (
            <p id="message-error" className="contact-error">
              {errors.message}
            </p>
          )}
        </div>

        <button className="contact-submit" type="submit">
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}

export default Contact
