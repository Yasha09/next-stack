import 'reflect-metadata';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, OneToMany,
} from "typeorm";

import {User} from "./User.entity";
import {Product} from "./Product.entity";

@Entity({name: "order"})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    userId: number;

    @Column({nullable: false})
    productId: number;

    @Column('decimal', {precision: 5, scale: 2})
    total: number;

    @Column({nullable: false})
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relation start

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToOne(() => Product, product => product.orders)
    product: Product;

    // Relation end
}