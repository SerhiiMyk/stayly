import { AbstractEntity } from '../database/index.js';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity.js';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}
