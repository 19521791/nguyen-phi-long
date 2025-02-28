import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { generateCustomId } from "@utils/generateId";

@Entity("books")
export class Book {
  @PrimaryColumn({ type: "varchar", length: 8 })
  id: string = generateCustomId();

  @Column({ type: "varchar", length: 255, nullable: false })
  author: string = "";

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number = 0.0;

  @Column({ type: "float", nullable: true })
  rating?: number;

  @Column({ type: "boolean", nullable: true })
  stock?: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  thumbnail?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string = "";

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date = new Date();

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date = new Date();
}
