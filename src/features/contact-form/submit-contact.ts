export type ContactState = { status: 'idle' | 'success' | 'error' }

export type ContactPayload = { name: string; email: string; message: string }

/**
 * Form action for the contact form.
 * TODO: replace the simulated delay with a real API call (e.g. POST /api/contact).
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const payload: ContactPayload = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
  }
  if (!payload.name || !payload.email || !payload.message) return { status: 'error' }

  await new Promise((resolve) => setTimeout(resolve, 600))
  return { status: 'success' }
}
