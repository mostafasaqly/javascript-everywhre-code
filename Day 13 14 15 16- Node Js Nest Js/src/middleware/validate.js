const STATUS = ['todo', 'in-progress', 'done']

export function validateTask({ partial = false } = {}) {
  return (req, res, next) => {
    const { title, status, projectId } = req.body ?? {}
    const errors = []

    if (!partial || title !== undefined) {
      if (typeof title !== 'string' || title.trim().length < 3) {
        errors.push('title must have at least 3 characters')
      }
    }
    if (status !== undefined && !STATUS.includes(status)) {
      errors.push('status: todo, in-progress or done')
    }
    if (projectId !== undefined && !Number.isInteger(projectId)) {
      errors.push('projectId must be a whole number')
    }

    if (errors.length > 0) return res.status(400).json({ errors })
    next()
  }
}
