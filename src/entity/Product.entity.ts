import 'reflect-metadata';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany,
} from "typeorm";

import {Order} from "./Order.entity";

@Entity({name: "product"})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column('decimal', {precision: 5, scale: 2})
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

//     Relation start

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[]

//     Relation end
}