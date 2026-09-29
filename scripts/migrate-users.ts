import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { User } from '../src/models/User';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  try {
    console.log('🔄 Iniciando migración de usuarios...');

    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI no está definida');
    }

    await mongoose.connect(mongoUri);
    console.log('✓ Conectado a MongoDB');

    // Leer archivo JSON
    const jsonPath = path.join(__dirname, 'server-data.json');
    if (!fs.existsSync(jsonPath)) {
      console.log('⚠ No existe server-data.json. Migrando solo usuario admin...');
    } else {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const users = data.users || [];

      console.log(`📦 Encontrados ${users.length} usuarios en JSON`);

      for (const jsonUser of users) {
        const existingUser = await User.findOne({ email: jsonUser.email.toLowerCase() });

        if (existingUser) {
          console.log(`⏭ Usuario ${jsonUser.email} ya existe en BD`);
          continue;
        }

        const user = new User({
          name: jsonUser.name,
          email: jsonUser.email.toLowerCase(),
          passwordHash: jsonUser.password,
          role: jsonUser.role || 'customer',
          favorites: jsonUser.favorites || [],
          isVerified: true, // Los usuarios existentes se consideran verificados
          createdAt: new Date(),
        });

        await user.save();
        console.log(`✓ Migrado: ${jsonUser.email}`);
      }
    }

    // Crear admin si no existe
    const adminEmail = (process.env.ADMIN_EMAIL || 'Mica@motos.com').toLowerCase();
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const adminUser = new User({
        name: process.env.ADMIN_NAME || 'Admin',
        email: adminEmail,
        passwordHash: process.env.ADMIN_PASSWORD || 'change_me_in_production',
        role: 'admin',
        isVerified: true,
      });

      await adminUser.save();
      console.log(`✓ Usuario admin creado: ${adminEmail}`);
    } else {
      console.log(`ℹ Admin ${adminEmail} ya existe`);
    }

    console.log('✅ Migración completada exitosamente');
  } catch (error) {
    console.error('❌ Error en migración:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
