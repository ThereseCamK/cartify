# Cartify

Cartify is an e-commerce website offering products across categories such as fashion, beauty, watches and headphones.

The website was developed as an exam project using the Noroff Online Shop API. The application is built with HTML, CSS and vanilla JavaScript.

## Live Site

[View Cartify on GitHub Pages](https://theresecamk.github.io/cartify/index.html)

[View the GitHub repository](https://github.com/ThereseCamK/cartify)

## About the Project

Cartify was designed to make it easy for young adults with busy everyday lives to browse and shop for a variety of products in one place.

Visitors can browse and view products without creating an account or logging in.

To add products to the cart or wishlist, the user must be logged in. New users can create an account and later log in using the email address and password used during registration.

Logged-in users can add, remove and update products in their cart before continuing to delivery and payment.

Cart and wishlist data are stored using localStorage and are associated with the logged-in user in the browser.

The website is responsive and designed to work across mobile, tablet and desktop screen sizes.

## Features

### Home Page

- Browse the available products.
- Search for products.
- Filter products by category.
- View three featured products in the carousel.
- Add products directly to the cart.
- Add or remove products from the wishlist using the heart icon.
- Open a product to view more information.

### Product Page

- View product information, description, price and tags.
- View available product reviews and ratings.
- Add the product to the cart.
- Add or remove the product from the wishlist.
- Share the product using supported sharing options or copy/share the product link.

### Authentication

- Register a new user with a unique username and a valid `@stud.noroff.no` email address.
- Log in using a registered email address and password.
- Log out of the current session.
- Cart and wishlist functionality is available to logged-in users.

### Cart

- View products added to the cart.
- Increase or decrease product quantities.
- Remove individual products.
- Clear the entire cart.
- View an order summary and total price.
- Continue to checkout.

### Checkout

During checkout, the user can:

- Enter delivery information including name, email and address.
- Use a delivery email address that is different from the account email.
- Select the destination country.
- Select a payment method.
- Review the order summary.
- Return to the cart to make changes before completing the order.

Payment functionality is simulated as part of the prototype and no real payment is processed.

### Order Confirmation

After completing the required checkout steps, the user is taken to a confirmation page displaying:

- Customer name.
- Email address.
- A generated order number.
- Order date.
- Confirmation that the order has been completed.


## Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Noroff API v2
- localStorage
- Git and GitHub
- GitHub Pages
- Figma

## Design

The design process included mobile and desktop prototypes as well as a style guide.

I spent time exploring different design directions before deciding on a simple design with clear visual elements and calls to action.

### Figma

- [Mobile prototype](https://www.figma.com/proto/X2eq5DJqtInAPMJVqxGkpf/Cartify?node-id=0-1&t=lMQ0Erl3t0OPr0Al-1)
- [Desktop prototype](https://www.figma.com/proto/X2eq5DJqtInAPMJVqxGkpf/Cartify?node-id=1-2&t=lMQ0Erl3t0OPr0Al-1)
- [Style guide](https://www.figma.com/design/X2eq5DJqtInAPMJVqxGkpf/Cartify?node-id=2-4&t=lMQ0Erl3t0OPr0Al-1)

## Project Structure

```text
cartify/
├── account/
├── cart/
├── checkout/
├── product/
├── success/
├── css/
├── js/
│   ├── auth/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── services/
│   ├── storage/
│   └── utils/
├── assets/
└── index.html
```


JavaScript is divided into modules based on responsibility, including authentication, reusable components, page-specific functionality, storage and utility functions.

## API

Cartify uses the Noroff API v2 for product data and user authentication.

## Getting started

To run the project locally:

Clone the repository:
1. git clone https://github.com/ThereseCamK/cartify.git
2. Open the project folder in your preferred code editor.
3. Run the project using Live Server or another local development server.

No additional dependencies or installation steps are required.

## Known limitations

Cartify is an exam project and prototype rather than a production e-commerce website.

* No real payments are processed.
* Orders do not result in real purchases or deliveries.
* Google and Apple authentication options are visual prototype elements 
and do not provide real third-party authentication.
* PayPal, Google Pay and Apple Pay are visual payment options only.
* The card payment form demonstrates how a card payment interface could work, but no card transaction is processed.

## AI usage

AI tools were used during the development process in accordance with the course guidelines.

See [AI_LOG.md](./AI_LOG.md) for documentation.

## Author

Therese Camilla Nordnes

[Github ](https://github.com/ThereseCamK)