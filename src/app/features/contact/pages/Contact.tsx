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
    errors.name = 'Escribe tu nombre.'
  } else if (form.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 letras.'
  }

  if (form.email.trim() === '') {
    errors.email = 'Escribe tu correo.'
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'El correo no es válido. Ejemplo: nombre@correo.com'
  }

  if (form.phone.trim() !== '' && !PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = 'El teléfono debe tener 8 números, sin espacios ni guiones.'
  }

  if (form.property === '') {
    errors.property = 'Elige una propiedad o «Consulta general».'
  }

  if (form.message.trim() === '') {
    errors.message = 'Escribe tu mensaje.'
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
    setSentName('')
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
      <div className="contact-intro">
        <p className="eyebrow">Contacto Noir</p>
        <h1 className="page-title">Hablemos de tu próximo hogar.</h1>
        <p className="page-intro">
          Elige una residencia y cuéntanos qué tienes en mente. Cada búsqueda empieza con una conversación.
        </p>
        <ul className="contact-tags">
          <li className="tag glass">Ciudad y playa</li>
          <li className="tag glass">Visitas privadas</li>
        </ul>
        <p className="contact-notice glass">
          <strong>Formulario de demostración.</strong> El envío es simulado: tus datos no se envían ni se guardan.
        </p>
      </div>

      <form className="contact-form panel" onSubmit={handleSubmit} noValidate>
        <h2>Cuéntanos qué buscas</h2>
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? true : false}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? true : false}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone">
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? true : false}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="field-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="property">Propiedad</label>
          <select
            id="property"
            name="property"
            value={form.property}
            onChange={handleChange}
            aria-invalid={errors.property ? true : false}
            aria-describedby={errors.property ? 'property-error' : undefined}
          >
            <option value="">Elige una opción</option>
            <option value={GENERAL_QUERY}>{GENERAL_QUERY}</option>
            {propertyNames.map((propertyName) => (
              <option key={propertyName} value={propertyName}>
                {propertyName}
              </option>
            ))}
          </select>
          {errors.property && (
            <p id="property-error" className="field-error">
              {errors.property}
            </p>
          )}
        </div>

        <div className="field contact-message">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            aria-invalid={errors.message ? true : false}
            aria-describedby={errors.message ? 'message-counter message-error' : 'message-counter'}
          />
          <p id="message-counter" className="contact-counter">{form.message.length} / 500</p>
          {errors.message && (
            <p id="message-error" className="field-error">
              {errors.message}
            </p>
          )}
        </div>

        {sentName !== '' && (
          <p className="contact-success" role="status">
            ¡Gracias, {sentName}! Recibimos tu mensaje (envío simulado).
          </p>
        )}

        <button className="button button--light contact-submit" type="submit">
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}

export default Contact
