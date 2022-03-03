import { useEffect, useState } from 'react'

import { Food } from '../../components/Food'
import { Header } from '../../components/Header'
import { ModalAddFood } from '../../components/ModalAddFood'
import { ModalEditFood } from '../../components/ModalEditFood'
import api from '../../services/api'
import { FoodsContainer } from './styles'
type IFood = {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image: string
}

export const Dashboard: React.FC = function () {
  console.log('xxxxxx')
  const [foods, setFoods] = useState<IFood[]>([])
  const [editingFood, setEditingFood] = useState({} as IFood)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    const loadFoods = async () => {
      const response = await api.get<IFood[]>('/foods')
      setFoods(response.data)
    }
    loadFoods()
  }, [])

  const handleAddFood = async (food: IFood) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: IFood) => {
    try {
      const foodUpdated = await api.put<IFood>(`/foods/${food.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods([...foodsUpdated])
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)

    setFoods([...foodsFiltered])
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food: IFood) => {
    setEditModalOpen(true)
    setEditingFood({ ...food })
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
