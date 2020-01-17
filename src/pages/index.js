import React, { useEffect } from 'react'

import THREELib from 'three-js'
let THREE = THREELib(['OrbitControls'])

function Home() {
  useEffect(() => {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.z = 170

    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', () => {
      let width = window.innerWidth
      let height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    })

    let controls = new THREE.OrbitControls(camera, renderer.domElement)
    console.log('controls', controls)

    let geometry = new THREE.TorusBufferGeometry(10, 2.4, 16, 100)
    let material = new THREE.MeshLambertMaterial({ color: 0x0f0f0f })
    let torus = new THREE.Mesh(geometry, material)
    torus.rotation.x = 0.2
    torus.rotation.y = 0.2
    torus.position.x = -20
    torus.position.y = -15
    torus.castShadow = true //default is false
    torus.receiveShadow = false //default
    scene.add(torus)

    let geometryTri = new THREE.TorusBufferGeometry(13, 2.4, 16, 3)
    let materialTri = new THREE.MeshLambertMaterial({ color: 0x0f0f0f })
    let triangle = new THREE.Mesh(geometryTri, materialTri)
    triangle.rotation.z = 28
    triangle.rotation.x = 0.2
    triangle.rotation.y = 0.2
    triangle.position.x = 4
    triangle.position.y = 4
    triangle.castShadow = true //default is false
    triangle.receiveShadow = false //default
    scene.add(triangle)

    let geometrySquare = new THREE.TorusBufferGeometry(14, 2.4, 16, 4)
    let materialSquare = new THREE.MeshLambertMaterial({ color: 0x0f0f0f })
    let square = new THREE.Mesh(geometrySquare, materialSquare)
    square.rotation.z = 0.8
    square.rotation.x = -0.15
    square.rotation.y = -0.15
    square.position.x = -6
    square.position.y = -6
    square.castShadow = true //default is false
    square.receiveShadow = false //default
    scene.add(square)

    // white background
    // scene.fog = new THREE.Fog(0xffffff, 0, 2000)
    // renderer.setClearColor(scene.fog.color, 1)

    let light1 = new THREE.PointLight(0xffffff, 0, 10000)
    light1.position.set(-200, -200, -5)
    scene.add(light1)

    let light2 = new THREE.PointLight(0xff0000, 0, 50)
    light2.position.set(-30, -30, 10)
    scene.add(light2)

    let light3 = new THREE.PointLight(0xf5e60d, 0, 50)
    light3.position.set(15, 15, 15)
    scene.add(light3)

    let light4 = new THREE.PointLight(0x0011ff, 0, 30)
    light4.position.set(2, -5, 10)
    scene.add(light4)

    let light5 = new THREE.PointLight(0xffffff, 0, 2000)
    light5.position.set(-6, -10, 30)
    scene.add(light5)

    let sphereSize = 1
    let pointLightHelper = new THREE.PointLightHelper(light5, sphereSize)
    // scene.add(pointLightHelper)

    const obj = {
      light1Intensity: true,
      light1IntensityStop: false,
      playRorateControls: true,
    }

    function update() {
      // torus.rotation.x += 0.01
      // torus.rotation.y += 0.01
      torusLightScript(obj, light1, light2, light3, light4, light5, camera, controls, triangle, square, torus)
    }

    let animate = function() {
      requestAnimationFrame(animate)
      update()
      renderer.render(scene, camera)
    }

    animate()

    document.body.appendChild(renderer.domElement)

    function torusLightScript(obj, light1, light2, light3, light4, light5, camera, controls, triangle, square, torus) {
      if (camera.position.z > 110) camera.position.z += -0.24
      if (camera.position.z > 100) camera.position.z += -0.22
      if (camera.position.z > 85) camera.position.z += -0.2
      if (camera.position.z > 70) camera.position.z += -0.1

      if (light1.intensity < 1 && !obj.light1Intensity) light1.intensity += 0.01

      if (light1.intensity < 5 && obj.light1Intensity && !obj.light1IntensityStop) light1.intensity += 0.2
      if (light1.position.x < 150) light1.position.x += 2
      else if (light1.position.x === 150) {
        obj.light1Intensity = false
        if (light1.intensity > 0 && !obj.light1Intensity && !obj.light1IntensityStop) light1.intensity -= 0.1
        if (light1.intensity < 0.01) obj.light1IntensityStop = true
        if (light2.intensity < 11 && !obj.lightDown) light2.intensity += 0.1
        if (light3.intensity < 11 && !obj.lightDown) light3.intensity += 0.1
        if (light4.intensity < 13 && !obj.lightDown) light4.intensity += 0.1
        if (camera.position.z < 71 && light4.intensity > 5 && camera.position.z >= 40) camera.position.z += -0.3
        if (camera.position.z < 71 && light4.intensity > 5 && camera.position.z > 30) camera.position.z += -0.2

        if (camera.position.z < 31 && obj.playRorateControls) {
          controls.autoRotate = true
          controls.autoRotateSpeed = 14
          if (controls.getAzimuthalAngle() <= -2.85) {
            obj.playRorateControls = false
            obj.startFarCamera = true
          }
          controls.update()
        }
        if (obj.startFarCamera) {
          triagleMoveScript(triangle)
          squareMoveScript(square)
          torusMoveScript(torus)
          // console.log(light3.position.x)
          if (light4.position.z > -2) light4.position.z -= 0.1
          if (light4.position.x > -6) light4.position.x -= 0.1
          if (!obj.lightDown) light4.intensity = 8

          if (light2.position.z > -15) light2.position.z -= 0.1
          if (light2.position.x < 25) light2.position.x += 0.1

          if (light3.position.x > -45) light3.position.x -= 0.2
          if (light3.position.z > -10) light3.position.z -= 0.1
        }
        if (camera.position.z > -115 && obj.startFarCamera) camera.position.z += -0.1
        // else if (obj.startFarCamera <= -200) obj.startFarCamera = false

        if (camera.position.z < -70) {
          obj.lightDown = true
          if (light2.intensity > 0) light2.intensity -= 0.1
          if (light3.intensity > 0) light3.intensity -= 0.1
          if (light4.intensity > 0) light4.intensity -= 0.1
        }
        if (camera.position.z < -60) {
          if (light5.intensity < 35) light5.intensity += 0.05
        }

        if (camera.position.z < -100) {
          if (light5.intensity !== 0) light5.intensity -= 0.4
          if (light1.intensity !== 0) light1.intensity -= 0.1
        }
      }
    }

    const triagleMoveScript = triangle => {
      if (triangle.rotation.x < 0.6) triangle.rotation.x += 0.02
      if (triangle.rotation.y < 2.7) triangle.rotation.y += 0.02

      if (triangle.rotation.z < 29.8) triangle.rotation.z += 0.02
      if (triangle.position.z !== 2) triangle.position.z = 2
      if (triangle.position.x > -16) triangle.position.x -= 0.2
      if (triangle.rotation.z > 29 && triangle.position.y < 4) triangle.position.y += 0.05
    }

    const squareMoveScript = square => {
      if (square.rotation.z > 0.75) square.rotation.z -= 0.001
      if (square.rotation.x < 0.15) square.rotation.x += 0.01
      if (square.rotation.y < 0.15) square.rotation.y += 0.01
    }

    const torusMoveScript = torus => {
      if (torus.position.x < 5) torus.position.x += 0.15
      if (torus.position.y > -19) torus.position.y -= 0.1
      if (torus.rotation.y < 2.8) torus.rotation.y += 0.014
      if (torus.rotation.x < 0.7) torus.rotation.x += 0.02
      if (torus.position.z > -3.2) torus.position.z -= 0.1
    }
  }, [])

  return <></>
}

// export default withAuth(Home)
export default Home
