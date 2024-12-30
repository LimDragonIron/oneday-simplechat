import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

async function main() {
    const db = new PrismaClient()
    const basePSW = await bcrypt.hashSync("123456789", 10)
    
    try {
        let userAccount1 = await db.account.create({
            data:{
                email: "test1@test.com",
                password: basePSW,
                name: "Tester1"
            }
        })
        
        console.log(userAccount1)

        let userAccount2 = await db.account.create({
            data:{
                email: "test2@test.com",
                password: basePSW,
                name: "Tester2"
            }
        })
        
        console.log(userAccount2)
    }catch(error){
         console.error("Error seeding default:", error)
    } finally {
        await db.$disconnect()
    }
}

main()