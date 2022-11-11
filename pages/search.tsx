import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
  return (
    <div className='container'>
      <div>
        <form action="">
          <input type="text" placeholder='Search your favourite Channel' />
          <button type='submit'><FaSearch /> Search</button>
        </form>
      </div>

    </div>
  )
}

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {}
  }
}