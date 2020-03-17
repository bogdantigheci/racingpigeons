import React from 'react';

import UserLayout from '../../../hoc/UserLayout';
import ManageBreeds from './ManageBreeds';
import ManageBreeders from './ManageBreeders';

const ManageCategories = () => {
  return (
    <div>
      <UserLayout>
        <ManageBreeders />
        <ManageBreeds />
      </UserLayout>
    </div>
  );
};

export default ManageCategories;
