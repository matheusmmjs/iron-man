/**
 * Cliente HTTP para fazer requisições à API com autenticação
 */
export const apiClient = {
  async get<T>(url: string): Promise<T> {
    let token

    // Verificar se estamos no navegador
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")
    } else {
      // No servidor, não temos acesso ao localStorage
      // Em um ambiente real, você pode querer buscar o token de outra forma
      token = null
    }

    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    return response.json()
  },

  async post<T>(url: string, data: any): Promise<T> {
    let token

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")
    } else {
      token = null
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    return response.json()
  },

  async put<T>(url: string, data: any): Promise<T> {
    let token

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")
    } else {
      token = null
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    return response.json()
  },

  async delete<T>(url: string): Promise<T> {
    let token

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")
    } else {
      token = null
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    return response.json()
  },
}
