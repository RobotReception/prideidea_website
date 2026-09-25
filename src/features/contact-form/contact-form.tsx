import { CheckCircle2 } from 'lucide-react'
import { useActionState, useId } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Label, Textarea } from '@/shared/ui'
import { submitContact, type ContactState } from './submit-contact'

export function ContactForm() {
  const { t } = useTranslation()
  const id = useId()
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: 'idle',
  })

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <p className="font-medium">{t('contact.form.success')}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-name`}>{t('contact.form.name')}</Label>
        <Input id={`${id}-name`} name="name" required autoComplete="name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-email`}>{t('contact.form.email')}</Label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          dir="ltr"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${id}-message`}>{t('contact.form.message')}</Label>
        <Textarea id={`${id}-message`} name="message" required />
      </div>
      <Button type="submit" size="lg" disabled={pending}>
        {t('contact.form.submit')}
      </Button>
    </form>
  )
}
