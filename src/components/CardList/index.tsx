/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { UsersProps } from '../../models/users';
import { Card } from '../Card';

export function CardList() {
  const [users, setUsers] = useState<UsersProps[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/users').then((e) => e.json()).then((el) => setUsers(el))
  }, [])
  
  return (
    <SimpleGrid spacing={20} mt="14" pb="14" minChildWidth='240px'>
      {users.map((user) => (
         <Card
          key={user.id}
          image={user.picture}
          name={user.name}
          lastName={user.lastName}
          email={user.email}
          phone={user.phone}
          country={user.address.country}
          city={user.address.city}
       />
      ))}
    </SimpleGrid>
  )
}
