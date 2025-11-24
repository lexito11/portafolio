import React, { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import imagen1 from '../assets/images/imagen1.jpg'
import logo from '../assets/images/logo.jpg'
import './Hero.css'

const Hero = ({ showArrow = true }) => {
  const canvasRef = useRef(null)
  const typingRef = useRef(null)
  const navigate = useNavigate()

  // Network nodes and connections
  const createNetwork = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Network configuration - Increased connectivity
    const nodeCount = 100 // Doubled from 50 to 100
    const connectionDistance = 140 // Reduced from 180 to 140 for more connections
    const maxConnectionsPerNode = 10 // Increased from 8 to 10 for more connections per node
    let nodes = []
    let connections = []
    let lastNodeSpawnTime = 0
    const nodeSpawnInterval = 1000 // Reduced from 2000 to 1000ms (every 1 second)

    // Fade-in state for connections
    const connectionAlphaByKey = new Map()
    const getConnectionKey = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`)
    const lineTargetAlpha = 0.15 // Reduced from 0.3 to 0.15 for even more transparency
    const lineFadeInStep = 0.008 // Reduced from 0.01 to 0.008 for smoother fade-in
    const lineFadeOutStep = 0.015 // Reduced from 0.02 to 0.015 for smoother fade-out

    // Create nodes with better distribution
    const gridSize = Math.ceil(Math.sqrt(nodeCount))
    const cellWidth = width / gridSize
    const cellHeight = height / gridSize
    
    for (let i = 0; i < nodeCount; i++) {
      // Calculate grid position
      const gridX = i % gridSize
      const gridY = Math.floor(i / gridSize)
      
      // Add some randomness within each grid cell for natural look
      const randomOffsetX = (Math.random() - 0.5) * cellWidth * 0.6
      const randomOffsetY = (Math.random() - 0.5) * cellHeight * 0.6
      
      nodes.push({
        x: (gridX * cellWidth) + (cellWidth / 2) + randomOffsetX,
        y: (gridY * cellHeight) + (cellHeight / 2) + randomOffsetY,
        vx: (Math.random() - 0.5) * 1.2, // Restored original velocity
        vy: (Math.random() - 0.5) * 1, // Restored original velocity
        size: Math.random() * 1.5 + 0.5, // Reduced from 3 + 1 to 1.5 + 0.5 (smaller size range)
        connections: [],
        age: 0 // Track node age
      })
    }

    // Function to spawn new nodes in empty spaces
    const spawnNewNodes = (currentTime) => {
      if (currentTime - lastNodeSpawnTime < nodeSpawnInterval) return
      
      // Limit total nodes to prevent performance issues
      if (nodes.length >= 150) return
      
      // Find areas with low node density
      const gridSize = 20 // Reduced back to 20 for better performance
      const cellWidth = width / gridSize
      const cellHeight = height / gridSize
      const densityMap = new Array(gridSize * gridSize).fill(0)
      
      // Count nodes in each grid cell
      nodes.forEach(node => {
        const gridX = Math.floor(node.x / cellWidth)
        const gridY = Math.floor(node.y / cellHeight)
        const index = gridY * gridSize + gridX
        if (index >= 0 && index < densityMap.length) {
          densityMap[index]++
        }
      })
      
      // Find empty cells only (not low-density to avoid overcrowding)
      const emptyCells = []
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const index = y * gridSize + x
          if (densityMap[index] === 0) {
            emptyCells.push({
              x: (x * cellWidth) + (cellWidth / 2) + (Math.random() - 0.5) * cellWidth * 0.8,
              y: (y * cellHeight) + (cellHeight / 2) + (Math.random() - 0.5) * cellHeight * 0.8
            })
          }
        }
      }
      
      // Spawn fewer nodes to avoid performance issues
      const nodesToSpawn = Math.min(2, emptyCells.length)
      for (let i = 0; i < nodesToSpawn; i++) {
        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length)
          const position = emptyCells.splice(randomIndex, 1)[0]
          
          nodes.push({
            x: position.x,
            y: position.y,
            vx: (Math.random() - 0.5) * 1.5, // Restored original velocity
            vy: (Math.random() - 0.5) * 2.5, // Restored original velocity
            size: Math.random() * 1.2 + 0.5, // Reduced from 2 + 1 to 1.2 + 0.5 (smaller size)
            connections: [],
            age: 0
          })
        }
      }
      
      lastNodeSpawnTime = currentTime
    }

    // Function to find and update connections
    const updateConnections = () => {
      // Keep previous alpha states for existing connections
      const nextAlpha = new Map()

      const currentConnections = []

      // Reset all connections on nodes
      nodes.forEach(node => {
        node.connections = []
      })

      // Find connections between nodes with priority for closer distances
      const potentialConnections = []
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            potentialConnections.push({
              from: i,
              to: j,
              distance: distance,
              strength: 1 - (distance / connectionDistance)
            })
          }
        }
      }

      // Sort connections by distance (closer first)
      potentialConnections.sort((a, b) => a.distance - b.distance)

      // Add connections while respecting limits
      potentialConnections.forEach(conn => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        
        if (from.connections.length < maxConnectionsPerNode && 
            to.connections.length < maxConnectionsPerNode) {
          currentConnections.push(conn)
          from.connections.push(conn.to)
          to.connections.push(conn.from)

          // Update alpha state
          const key = getConnectionKey(conn.from, conn.to)
          const prev = connectionAlphaByKey.get(key) ?? 0
          // Move towards target alpha (fade-in)
          const increased = Math.min(lineTargetAlpha, prev + lineFadeInStep)
          nextAlpha.set(key, increased)
        }
      })

      // Fade-out any connections that no longer exist
      connectionAlphaByKey.forEach((alpha, key) => {
        if (!nextAlpha.has(key)) {
          const decreased = Math.max(0, alpha - lineFadeOutStep)
          if (decreased > 0) nextAlpha.set(key, decreased)
        }
      })

      connections = currentConnections
      // Replace map with updated values
      connectionAlphaByKey.clear()
      nextAlpha.forEach((v, k) => connectionAlphaByKey.set(k, v))

      // Ensure all nodes have at least 3 connections for better triangle formation
      nodes.forEach((node, index) => {
        if (node.connections.length < 3) {
          // Find additional nodes to connect to
          let candidates = []
          
          for (let j = 0; j < nodes.length; j++) {
            if (j !== index && !node.connections.includes(j) && nodes[j].connections.length < maxConnectionsPerNode) {
              const dx = node.x - nodes[j].x
              const dy = node.y - nodes[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < connectionDistance * 1.8) {
                candidates.push({ nodeIndex: j, distance: distance })
              }
            }
          }
          
          candidates.sort((a, b) => a.distance - b.distance)
          
          for (let candidate of candidates) {
            if (node.connections.length >= 3) break
            
            const candidateNode = nodes[candidate.nodeIndex]
            if (candidateNode.connections.length < maxConnectionsPerNode) {
              const key = getConnectionKey(index, candidate.nodeIndex)
              const prev = connectionAlphaByKey.get(key) ?? 0
              const increased = Math.min(lineTargetAlpha, prev + lineFadeInStep)
              connectionAlphaByKey.set(key, increased)

              connections.push({
                from: index,
                to: candidate.nodeIndex,
                distance: candidate.distance,
                strength: 0.4
              })
              node.connections.push(candidate.nodeIndex)
              candidateNode.connections.push(index)
            }
          }
        }
      })
    }

    // Initial connections
    updateConnections()

    // Animation loop
    const animate = (currentTime) => {
      ctx.clearRect(0, 0, width, height)

      // Spawn new nodes in empty spaces
      spawnNewNodes(currentTime)

      // Update node positions with repulsion for better distribution
      nodes.forEach(node => {
        // Increment age
        node.age++
        
        // Apply repulsion from other nodes to maintain spacing
        let repulsionX = 0
        let repulsionY = 0
        
        nodes.forEach(otherNode => {
          if (otherNode !== node) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance > 0 && distance < 80) { // Repulsion radius
              const force = (80 - distance) / 80
              repulsionX += (dx / distance) * force * 0.5
              repulsionY += (dy / distance) * force * 0.5
            }
          }
        })
        
        // Apply repulsion and movement
        node.x += node.vx + repulsionX
        node.y += node.vy + repulsionY

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      })

        // Update connections less frequently for better performance
      if (Math.random() < 0.08) { // Reduced from 0.15 to 0.08
        updateConnections()
      }

      // Draw connections (lines between nodes)
      connections.forEach(conn => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        
        // Fetch and advance alpha for this connection (per-frame fade-in)
        const key = getConnectionKey(conn.from, conn.to)
        const prevAlpha = connectionAlphaByKey.get(key) ?? 0
        const nextAlpha = Math.min(lineTargetAlpha, prevAlpha + lineFadeInStep)
        connectionAlphaByKey.set(key, nextAlpha)
        if (nextAlpha <= 0) return
        
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = `rgba(0, 212, 255, ${nextAlpha.toFixed(3)})`
        ctx.lineWidth = 0.4 // keep thin lines
        ctx.stroke()
      })

      // Draw nodes (dots)
      nodes.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 212, 255, 0.25)' // Reduced from 0.4 to 0.25 for even more transparency
        ctx.fill()
        
        // Glow effect with reduced intensity
        ctx.shadowColor = 'rgba(0, 212, 255, 0.25)' // Reduced from 0.4 to 0.25 for even more transparency
        ctx.shadowBlur = 60 // Reduced from 100 to 60 for very subtle glow
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw triangles formed by connections
      // drawTriangles(ctx, nodes, connections) // Triangles removed - only dots and lines visible
      
      // Draw squares and rectangles formed by connections
      drawSquaresAndRectangles(ctx, nodes, connections)

      return requestAnimationFrame(animate)
    }

    // Start animation
    animate(0)
  }, [])

  // Function to draw triangles formed by connected nodes
  const drawTriangles = (ctx, nodes, connections) => {
    const triangles = new Set()
    
    // Find triangles (3 nodes all connected to each other)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].connections.length; j++) {
        const k = nodes[i].connections[j]
        if (k > i) {
          for (let l = 0; l < nodes[k].connections.length; l++) {
            const m = nodes[k].connections[l]
            if (m > k && nodes[i].connections.includes(m)) {
              // Found a triangle: i, k, m
              const triangleKey = [i, k, m].sort().join(',')
              if (!triangles.has(triangleKey)) {
                triangles.add(triangleKey)
                
                // Draw triangle outline
                ctx.beginPath()
                ctx.moveTo(nodes[i].x, nodes[i].y)
                ctx.lineTo(nodes[k].x, nodes[k].y)
                ctx.lineTo(nodes[m].x, nodes[m].y)
                ctx.closePath()
                ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)' // Uniform opacity for all lines
                ctx.lineWidth = 1.5 // Uniform line width for all lines
                ctx.stroke()
                
                // Fill triangle removed - only outline remains
              }
            }
          }
        }
      }
    }
  }

  // Function to draw squares and rectangles formed by connected nodes
  const drawSquaresAndRectangles = (ctx, nodes, connections) => {
    const quadrilaterals = new Set()
    
    // Find quadrilaterals (4 nodes all connected to each other)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].connections.length; j++) {
        const k = nodes[i].connections[j]
        if (k > i) {
          for (let l = 0; l < nodes[k].connections.length; l++) {
            const m = nodes[k].connections[l]
            if (m > k && m !== i && nodes[i].connections.includes(m)) {
              // Look for fourth node that connects to all three
              for (let n = 0; n < nodes[m].connections.length; n++) {
                const o = nodes[m].connections[n]
                if (o > m && o !== i && o !== k && 
                    nodes[i].connections.includes(o) && 
                    nodes[k].connections.includes(o)) {
                  
                  // Found a quadrilateral: i, k, m, o
                  const quadKey = [i, k, m, o].sort().join(',')
                  if (!quadrilaterals.has(quadKey)) {
                    quadrilaterals.add(quadKey)
                    
                    // Calculate if it's close to a square or rectangle
                    const points = [nodes[i], nodes[k], nodes[m], nodes[o]]
                    const isSquare = isCloseToSquare(points)
                    
                    // Draw quadrilateral outline
                    ctx.beginPath()
                    ctx.moveTo(points[0].x, points[0].y)
                    ctx.lineTo(points[1].x, points[1].y)
                    ctx.lineTo(points[2].x, points[2].y)
                    ctx.lineTo(points[3].x, points[3].y)
                    ctx.closePath()
                    
                    if (isSquare) {
                      // Square - same blue as other lines
                      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)' // Reduced from 0.2 to 0.1 for very subtle transparency
                      ctx.lineWidth = 0.1 // Reduced from 0.6 to 0.4 for even thinner lines
                      // ctx.fillStyle = 'rgba(255, 107, 107, 0.15)' // Fill removed
                    } else {
                      // Rectangle - standard blue
                      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)' // Reduced from 0.2 to 0.1 for very subtle transparency
                      ctx.lineWidth = 0.1 // Reduced from 0.6 to 0.4 for even thinner lines
                      // ctx.fillStyle = 'rgba(0, 212, 255, 0.1)' // Fill removed
                    }
                    
                    ctx.stroke()
                    // ctx.fill() // Fill removed - only outline remains
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Helper function to determine if 4 points form a square-like shape
  const isCloseToSquare = (points) => {
    if (points.length !== 4) return false
    
    // Calculate distances between all points
    const distances = []
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        const dx = points[i].x - points[j].x
        const dy = points[i].y - points[j].y
        distances.push(Math.sqrt(dx * dx + dy * dy))
      }
    }
    
    // Sort distances
    distances.sort((a, b) => a - b)
    
    // In a square, we should have 4 equal sides and 2 equal diagonals
    // Check if the first 4 distances are similar (sides) and last 2 are similar (diagonals)
    const sideTolerance = 0.3 // 30% tolerance for sides
    const diagonalTolerance = 0.4 // 40% tolerance for diagonals
    
    const sides = distances.slice(0, 4)
    const diagonals = distances.slice(4, 6)
    
    const sideVariation = (Math.max(...sides) - Math.min(...sides)) / Math.min(...sides)
    const diagonalVariation = (Math.max(...diagonals) - Math.min(...diagonals)) / Math.min(...diagonals)
    
    return sideVariation < sideTolerance && diagonalVariation < diagonalTolerance
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Visibility change detection to keep animation running
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Restart animation when tab becomes visible
        createNetwork()
      }
    }

    // Page visibility API
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Focus events as backup
    window.addEventListener('focus', () => {
      createNetwork()
    })

    // Start network animation
    createNetwork()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleVisibilityChange)
    }
    }, []) // Keep empty dependency array to prevent recreation

  // Typing effect with precise timing control
  useEffect(() => {
    const words = ['Desarrollador Web Full-Stack', 'Programador Frontend', 'Diseñador UI/UX', 'Entusiasta de la Tecnología']
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let isPaused = false

    const type = () => {
      if (isPaused) return

      // Verificar que el elemento existe antes de acceder a él
      if (!typingRef.current) return

      const currentWord = words[wordIndex]
      
      if (isDeleting) {
        typingRef.current.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
      } else {
        typingRef.current.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
      }

      // Control preciso del timing
      if (!isDeleting && charIndex === currentWord.length) {
        // Pausa de 3 segundos cuando termina de escribir
        isPaused = true
        setTimeout(() => {
          isDeleting = true
          isPaused = false
          type()
        }, 2000) // 2 segundos de pausa
        return
      } else if (isDeleting && charIndex === 0) {
        // Pausa de 2 segundos antes de la siguiente palabra
        isPaused = true
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(() => {
          isPaused = false
          type()
        }, 1000) // 1 segundo de pausa
        return
      }

      // Velocidad controlada: 60ms por carácter para borrar más rápido
      const speed = isDeleting ? 60 : 80
      setTimeout(type, speed)
    }

    // Iniciar después de 1 segundo
    setTimeout(type, 1000)
  }, [])

  const scrollToProjects = () => {
    navigate('/proyectos')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <section 
      id="hero" 
      className={`hero ${showArrow ? 'show-arrow' : 'hide-arrow'}`}
      style={{
        backgroundImage: `url(${imagen1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Overlay semitransparente para opacidad */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)', // Aumentado de 0.3 a 0.6 (60% de opacidad)
          zIndex: 0
        }}
      />
      <canvas
        ref={canvasRef}
        className="network-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2 // Aumentado para estar encima del overlay
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', justifyItems: 'center', gap: '2rem', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
          <div style={{ textAlign: 'left', justifySelf: 'start', width: '100%' }}>
            <h1 style={{ color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>Hola, soy Alexander</h1>
            <p className="subtitle"><span style={{ color: '#ffffff' }}>Soy</span> <span ref={typingRef} id="typing-effect" style={{ color: 'var(--primary-color)' }}></span></p>
            <button onClick={scrollToProjects} className="cta-button">
              Ver mis proyectos
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', justifySelf: 'end', width: '100%' }}>
            <div className="hero-logo-container" style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '2px solid var(--primary-color)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)',
              overflow: 'hidden',
              padding: '0'
            }}>
              <img 
                src={logo} 
                alt="Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-down" style={{ position: 'relative', zIndex: 3 }}>
        <span></span>
      </div>
    </section>
  )
}

export default Hero 