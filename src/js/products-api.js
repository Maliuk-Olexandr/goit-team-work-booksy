import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books';
const apiClient = axios.create({ baseURL: BASE_URL });

/**
 * Helper function to make API requests to the base URL.
 * Handles basic error logging.
 * @param {string} url - The endpoint URL relative to BASE_URL.
 * @returns {Promise<Object|Array>} - The data returned from the API.
 */
async function fetchURL(url = '') {
  try {
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

/**
 * Fetches the list of book categories from the API
 * @returns {Promise<Array>} Array of category names (list_name property from each category object)
 */
export async function getCategoryList() {
  const list = await fetchURL('/category-list');
  return list.map(e => e.list_name);
}

/**
 * Fetches the list of top 5 books in each categorie from the API
 * @returns {Promise<Object>} Object of book categories, each containing details about the 5 books within that category
 */
export async function getTopBooks() {
  return await fetchURL(`/top-books`);
}

/**
 * Fetches the list books in certain categorie from the API
 * @param {string} category - The name of the category to fetch books for.
 * @returns {Promise<Object>} Object of books in that category
 */
export async function getBooksByCategory(category) {
  if (!category) {
    const error = new Error('Valid category must be provided.');
    console.error(error);
    throw error;
  }
  return await fetchURL(`/category?category=${category}`);
}

/**
 * Fetches the list of book details by ID from the API
 * @param {string} id - The unique ID of the book.
 * @returns {Promise<Object>} An object containing the book's details.
 */
export async function getBookByID(id) {
  if (!id) {
    const error = new Error('Valid book ID must be provided.');
    console.error(error);
    throw error;
  }
  return await fetchURL(`/${id}`);
}

// start TODO: Remove this test code before production deployment.
export async function testAPI() {
  try {
    const catList = await getCategoryList();
    const topBooks = await getTopBooks();
    const booksByCategory = await getBooksByCategory(catList[0]);
    const id = booksByCategory[0]._id;
    console.log('\x1b[32mtestAPI() start ------------\x1b[0m');
    console.log('\x1b[32m1. getCategoryList():\x1b[0m', catList);
    console.log('\x1b[32m2. getTopBooks():\x1b[0m', topBooks);
    console.log(
      `\x1b[32m3. getBooksByCategory('${catList[0]}'):\x1b[0m`,
      booksByCategory
    );
    console.log(`\x1b[32m4. getBookByID("${id}"):`, await getBookByID(id));
    console.log('\x1b[32mtestAPI() end ------------\x1b[\x1b[0m');
  } catch (error) {
    console.error('API test failed:', error);
  }
}
// end TODO: Remove this test code before production deployment.
