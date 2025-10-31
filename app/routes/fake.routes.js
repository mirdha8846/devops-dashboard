import { Router } from "express";


const router=Router()

router.get('/login',(req, res) => {
  res.json({ message: 'User logged in successfully', status: 'ok' })
})
router.get('/products',(req, res) => {
  const products=[
    { id: 1, name: 'Pizza', price: 299 },
    { id: 2, name: 'Burger', price: 199 },
    { id: 3, name: 'Pasta', price: 249 }
  ]
  res.json(products)
})
router.get('/orders',(req, res) => {
  res.json({ orderId: 'ORD123', status: 'Delivered', amount: 499 })
})

export default router