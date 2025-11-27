import { useState, useEffect } from 'react'

/**
 * Hook personalizado para detectar si la pantalla es móvil
 * Considera móvil solo pantallas ≤ 480px (no tablets)
 * @returns {boolean} true si es móvil (≤480px), false en caso contrario
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar el tamaño de la pantalla
    const checkIsMobile = () => {
      // Solo móviles: ≤ 480px (no incluye tablets que empiezan en 481px)
      setIsMobile(window.innerWidth <= 480)
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

