import { PrismaClient  } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear old data
  await prisma.incident.deleteMany({})
  await prisma.camera.deleteMany({})

  console.log('Seeding new data...')

  // Create Cameras
  const cam1 = await prisma.camera.create({
    data: { name: 'Camera-01', location: 'Shop Floor Camera A' },
  })
  const cam2 = await prisma.camera.create({
    data: { name: 'Camera-02', location: 'Vault Entrance' },
  })
  const cam3 = await prisma.camera.create({
    data: { name: 'Camera-03', location: 'Main Entrance' },
  })

  console.log('Cameras created.')

  // Create Incidents
  const now = new Date()
  await prisma.incident.createMany({
    data: [
      { cameraId: cam1.id, type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 10 * 60000), tsEnd: new Date(now.getTime() - 9 * 60000), thumbnailUrl: '/thumb1.png', resolved: false },
      { cameraId: cam1.id, type: 'Gun Threat', tsStart: new Date(now.getTime() - 15 * 60000), tsEnd: new Date(now.getTime() - 14 * 60000), thumbnailUrl: '/thumb2.png', resolved: false },
      { cameraId: cam2.id, type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 25 * 60000), tsEnd: new Date(now.getTime() - 24 * 60000), thumbnailUrl: '/thumb3.png', resolved: false },
      { cameraId: cam2.id, type: 'Face Recognised', tsStart: new Date(now.getTime() - 40 * 60000), tsEnd: new Date(now.getTime() - 39 * 60000), thumbnailUrl: '/thumb4.png', resolved: false },
      { cameraId: cam3.id, type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 55 * 60000), tsEnd: new Date(now.getTime() - 54 * 60000), thumbnailUrl: '/thumb5.png', resolved: false },
      { cameraId: cam3.id, type: 'Traffic Congestion', tsStart: new Date(now.getTime() - 80 * 60000), tsEnd: new Date(now.getTime() - 79 * 60000), thumbnailUrl: '/thumb6.png', resolved: false },
      
      // Add one resolved incident for testing
      { cameraId: cam1.id, type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 120 * 60000), tsEnd: new Date(now.getTime() - 119 * 60000), thumbnailUrl: '/thumb1.png', resolved: true },
    ],
  });

  console.log('Incidents created.')
  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })