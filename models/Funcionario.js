import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const funcionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true },
    cargo: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

funcionarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

funcionarioSchema.methods.compararSenha = async function (senhaEnviada) {
    return bcrypt.compare(senhaEnviada, this.senha);
};

export default mongoose.model('Funcionario', funcionarioSchema);