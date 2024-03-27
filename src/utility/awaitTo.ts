// Usage-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// const { res, err } = await to(db.query())
// if (err)...
// const { res: users, err: userErr } = await to(db.query('users'))
// if (userErr) ...

/**
 * @param { Promise } promise
 * @return { res, err }
 */

export async function to (promise) {
  try {
    const res = await promise
    return { res, err: null }
  } catch (err) {
    return { res: null, err }
  }
}
