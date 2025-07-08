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
  const response = await fetchURL(`/top-books`);
  const uniqueBooks = response.map(list => ({
    ...list,
    books: filterUniqueBooksByImage(list.books),
  }));
  return uniqueBooks;
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
  const response = await fetchURL(`/category?category=${category}`);
  const uniqueBooks = filterUniqueBooksByImage(response);
  return uniqueBooks;
}

/**
 * Filters an array of books to keep only those with unique book_image URLs
 * @param {Array<Object>} books - Array of book objects
 * @returns {Array<Object>} Filtered array of books with unique book_image
 */
function filterUniqueBooksByImage(books) {
  return books.filter(
    (book, index, self) =>
      index === self.findIndex(b => b.book_image === book.book_image)
  );
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
    //console.log('\x1b[32m1. getCategoryList():\x1b[0m', catList);
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
testAPI();
// end TODO: Remove this test code before production deployment.

// [
//   {
//     list_name: '',
//     books: [
//       {
//         _id: '68680e31ac8a51f74dd6a25b',
//         list_name: '',
//         date: '2025-07-04T17:24:02.329Z',
//         age_group: '',
//         amazon_product_url:
//           'https://www.amazon.com/dp/1338896458?tag=thenewyorktim-20',
//         article_chapter_link: '',
//         author: 'Dav Pilkey',
//         book_image:
//           'https://static01.nyt.com/bestsellers/images/9781338896459.jpg',
//         book_image_width: 338,
//         book_image_height: 500,
//         book_review_link: '',
//         book_uri: 'nyt://book/52621d46-3407-5984-aa82-ebbc4fccefcd',
//         contributor: 'by Dav Pilkey',
//         contributor_note: '',
//         created_date: '2025-07-01T22:43:36.478Z',
//         description:
//           'The 13th book in the Dog Man series. Big Jim has an adventure that brings up the past.',
//         first_chapter_link: '',
//         price: '0.00',
//         primary_isbn10: '',
//         primary_isbn13: '9781338896459',
//         publisher: 'Scholastic',
//         rank: 1,
//         rank_last_week: 1,
//         sunday_review_link: '',
//         title: 'BIG JIM BEGINS',
//         updated_date: '2025-07-01T22:43:36.478Z',
//         weeks_on_list: 7,
//         buy_links: [
//           {
//             name: 'Amazon',
//             url: 'https://www.amazon.com/dp/1338896458?tag=thenewyorktim-20',
//           },
//           {
//             name: 'Apple Books',
//             url: 'https://goto.applebooks.apple/9781338896459?at=10lIEQ',
//           },
//           {
//             name: 'Barnes and Noble',
//             url: 'https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781338896459',
//           },
//           {
//             name: 'Books-A-Million',
//             url: 'https://www.anrdoezrs.net/click-7990613-35140?url=https%3A%2F%2Fwww.booksamillion.com%2Fp%2FBIG%2BJIM%2BBEGINS%2FDav%2BPilkey%2F9781338896459',
//           },
//           {
//             name: 'Bookshop.org',
//             url: 'https://bookshop.org/a/3546/9781338896459',
//           },
//         ],
//         __v: 0,
//       },
//       {
//         _id: '68680e31ac8a51f74dd6a25c',
//         list_name: '',
//         date: '2024-05-24T10:30:30.000Z',
//         age_group: '',
//         amazon_product_url:
//           'https://www.amazon.com/dp/1338896458?tag=thenewyorktim-20',
//         article_chapter_link: '',
//         author: 'Dav Pilkey',
//         book_image:
//           'https://static01.nyt.com/bestsellers/images/9781338896459.jpg',
//         book_image_width: 338,
//         book_image_height: 500,
//         book_review_link: '',
//         book_uri: 'nyt://book/52621d46-3407-5984-aa82-ebbc4fccefcd',
//         contributor: 'by Dav Pilkey',
//         contributor_note: '',
//         created_date: '2025-07-01T22:43:36.478Z',
//         description:
//           'The 13th book in the Dog Man series. Big Jim has an adventure that brings up the past.',
//         first_chapter_link: '',
//         price: '0.00',
//         primary_isbn10: '',
//         primary_isbn13: '9781338896459',
//         publisher: 'Scholastic',
//         rank: 1,
//         rank_last_week: 1,
//         sunday_review_link: '',
//         title: 'BIG JIM BEGINS',
//         updated_date: '2025-07-01T22:43:36.478Z',
//         weeks_on_list: 7,
//         buy_links: [
//           {
//             name: 'Amazon',
//             url: 'https://www.amazon.com/dp/1338896458?tag=thenewyorktim-20',
//           },
//           {
//             name: 'Apple Books',
//             url: 'https://goto.applebooks.apple/9781338896459?at=10lIEQ',
//           },
//           {
//             name: 'Barnes and Noble',
//             url: 'https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781338896459',
//           },
//           {
//             name: 'Books-A-Million',
//             url: 'https://www.anrdoezrs.net/click-7990613-35140?url=https%3A%2F%2Fwww.booksamillion.com%2Fp%2FBIG%2BJIM%2BBEGINS%2FDav%2BPilkey%2F9781338896459',
//           },
//           {
//             name: 'Bookshop.org',
//             url: 'https://bookshop.org/a/3546/9781338896459',
//           },
//         ],
//         __v: 0,
//       },
//     ],
//   },
// ];
