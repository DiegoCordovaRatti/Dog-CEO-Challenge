import React from "react";
import List from "../pages/list/List.jsx"
import { render, screen } from "@testing-library/react";

const breed = 'bulldog'
const subBreed = 'french'

describe('Test for List', () => {
    test('Component renders', () =>{
        render(<List />);
        expect(screen.getByText(/filter 🐶 by/i)).toBeInTheDocument();

    })
    test('fetch all breeds', async ()=>{
        // ARRANGE
        const { message } = await fetch('https://dog.ceo/api/breeds/list/all').then(response => response.json()); 
        const expectedBreed = message[breed]
        // ACT
        // ASSERT
        expect(expectedBreed).not.toBeNull()
    })  
    test('fetch random image from a breed', async ()=>{
        // ARRANGE
        const { message } = await fetch(`https://dog.ceo/api/breed/${breed}/images`).then(response => response.json());
        // ACT
        // ASSERT
        expect(message).not.toHaveLength(0)
    })  
    test('fetch random image from a sub-breed', async ()=>{
        // ARRANGE
        const { message } = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`).then(response => response.json());
        // ACT
        // ASSERT
        expect(message).not.toHaveLength(0)
    })  
});

