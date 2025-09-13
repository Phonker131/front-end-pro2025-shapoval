import '@testing-library/jest-dom/vitest'
import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'
import { renderWithStore } from './utils/test-utils.jsx'

vi.mock('../features/api.js', () => {
  return {
    fetchTodos: vi.fn(async () => []),
    createTodo: vi.fn(async (text) => ({
      id: 101, text, completed: false, createdAt: Date.now(), updatedAt: Date.now()
    })),
    patchTodo: vi.fn(async (id, patch) => ({ id, ...patch, updatedAt: Date.now() })),
    removeTodo: vi.fn(async (id) => id),
  }
})
import * as API from '../features/api.js'

beforeEach(() => {
  vi.clearAllMocks()
})

async function renderWithInitialTodos(list) {
  API.fetchTodos.mockResolvedValueOnce(list)
  return renderWithStore(<App />)
}

it('adds a new todo item with given text (optimistic then commit)', async () => {

  renderWithStore(<App />)

  const input = await screen.findByPlaceholderText('New task...')
  const addBtn = screen.getByRole('button', { name: 'Add' })

  await userEvent.type(input, 'Buy milk 123')
  await userEvent.click(addBtn)

  const item = await screen.findByText('Buy milk 123')
  expect(item).toBeInTheDocument()

  expect(screen.getByText('Optimistic')).toBeInTheDocument()
  await waitFor(() => expect(screen.queryByText('Optimistic')).not.toBeInTheDocument())

  expect(API.createTodo).toHaveBeenCalledWith('Buy milk 123')
})

it('toggles a todo item and marks it as done', async () => {
  const now = Date.now()
  await renderWithInitialTodos([{ id: 1, text: 'Toggle me', completed: false, createdAt: now, updatedAt: now }])

  const row = await screen.findByText('Toggle me')
  const card = row.closest('.card')
  const checkbox = within(card).getByRole('checkbox')

  await userEvent.click(checkbox)

  await waitFor(() => expect(API.patchTodo).toHaveBeenCalledWith(1, { completed: true }))
  await waitFor(() => expect(row).toHaveClass('done'))
})

it('deletes a todo item', async () => {
  const now = Date.now()
  await renderWithInitialTodos([{ id: 2, text: 'Remove me', completed: false, createdAt: now, updatedAt: now }])

  const row = await screen.findByText('Remove me')
  const card = row.closest('.card')
  const delBtn = within(card).getByRole('button', { name: 'Remove' })

  await userEvent.click(delBtn)

  await waitFor(() => expect(API.removeTodo).toHaveBeenCalledWith(2))
  await waitFor(() => expect(screen.queryByText('Remove me')).not.toBeInTheDocument())
})

it('clears completed items only', async () => {
  const now = Date.now()
  await renderWithInitialTodos([
    { id: 10, text: 'Stay', completed: false, createdAt: now, updatedAt: now },
    { id: 11, text: 'Done', completed: true, createdAt: now, updatedAt: now }
  ])

  const clearBtn = await screen.findByRole('button', { name: 'Clear done' })
  await userEvent.click(clearBtn)

  await waitFor(() => expect(API.removeTodo).toHaveBeenCalledWith(11))
  await waitFor(() => expect(screen.queryByText('Done')).not.toBeInTheDocument())
  expect(screen.getByText('Stay')).toBeInTheDocument()
})
