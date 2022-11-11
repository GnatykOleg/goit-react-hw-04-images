# React Image Finder With Hooks

# The code of this application was refactored: [prev-project](https://github.com/GnatykOleg/react-image-finder) using React hooks (useState, useEffect)

#### Adaptive design to mobile, table, desktop.

#### 1. An application for searching images by keyword was written.

#### 2. Searchbar, ImageGallery, ImageGalleryItem, Loader, and Button components created and Modal.

#### 3. Used public api Pixabay API.

#### 4. The Pixabay API supports pagination, the default page parameter is 1. The response will come in 12 objects, set in the per_page parameter. At Search for a new keyword, the page value is reset to 1.

#### - Description of the Searchbar component The component accepts one prop onSubmit - a function to pass the value of the input when submitting the form.

#### - Description of the ImageGallery component List of image cards.

#### - Description of the component ImageGalleryItem Component of the list item with an image.

#### - Description of the Button component in the next batch of images and render along with the previous ones. The button rendered only when there are some loaded images. If the image array is empty, the button is not rendered.

#### - Description of the Loader component Spinner component, displayed while loading images. Used react-loader-spinner.

#### - Description of the Modal component a window with a dark overlay and a larger version of the image is displayed. Modal The window is closed by pressing the ESC key or by clicking on the overlay.

![gallery](./public/gallery.jpg)
