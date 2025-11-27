import { useState, useEffect } from 'react'

/**
 * Hook personalizado para detectar si la pantalla es móvil
 * Considera móvil pantallas ≤ 500px
 * @returns {boolean} true si es móvil (≤500px), false en caso contrario
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar el tamaño de la pantalla
    const checkIsMobile = () => {
      // Móviles: ≤ 500px
      setIsMobile(window.innerWidth <= 500)
    }

    // Verificar al montar
    checkIsMobile()

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkIsMobile)

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return isMobile
}

