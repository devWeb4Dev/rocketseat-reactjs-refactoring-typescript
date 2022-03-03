import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import Input from '../Input'
import { Modal } from '../Modal'
import { Form } from './styles'

type IFood = {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image: string
}

type ModalEditFoodProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleUpdateFood: (food: IFood) => void
  editingFood: IFood
}

export const ModalEditFood: React.FC<ModalEditFoodProps> = function ({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood,
}: ModalEditFoodProps) {
  const formRef = useRef(null)
  const handleSubmit = async (data: IFood) => {
    handleUpdateFood({ ...editingFood, ...data })
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editors Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descried" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Edited Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
