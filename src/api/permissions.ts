import api from '@/utils/axios.ts'

export const fetchPermissions = async () => {
  const response = await api.get('permissions-simplified', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response.data
}
