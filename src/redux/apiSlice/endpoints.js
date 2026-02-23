// src/redux/apiSlice/endpoints.js

export const endpoints = {
  // Product endpoints
  Product: {
    createProduct: "create-product",
    updateProductById: "update-product",
    getAllProducts: "get-all-products",
    getListProduct: "get-list-products",
    getCardListProduct: "get-card-list-products",
    getProductById: "get-product-by-id",
    getProductBySlug: "get-product-by-slug",
    getProductsByCategory: "get-products-by-category",
    deleteProductById: "delete-product",
    toggleProductStatus: "toggle-status-new",
  },

  // Body Type endpoints
  BodyType: {
    createBodyType: "create-bodyType",
    updateBodyTypeById: "update-bodyType",
    getAllBodyTypes: "get-all-bodyType",
    getListBodyTypes: "get-list-bodyType",
    getBodyTypeById: "get-bodyType-by-id",
    deleteBodyTypeById: "delete-bodyType",
  },

  // Product Color endpoints
  ProductColor: {
    createProductColor: "create-color",
    updateProductColorById: "update-color",
    getAllProductColors: "get-all-color",
    getListProductColors: "get-list-color",
    getProductColorById: "get-color-by-id",
    deleteProductColorById: "delete-color",
  },

  // Drivetrain Type endpoints
  Drivetrain: {
    createDrivetrain: "create-drivetrain",
    updateDrivetrain: "update-drivetrain",
    getAllDrivetrains: "get-all-drivetrains",
    getListDrivetrains: "get-list-drivetrains",
    getDrivetrainById: "get-drivetrain-by-id",
    deleteDrivetrain: "delete-drivetrain",
  },

  // Feature Type endpoints
  Features: {
    createFeature: "create-feature",
    updateFeatureById: "update-feature",
    getAllFeatures: "get-all-features",
    getListFeatures: "get-list-features",
    getFeatureById: "get-feature-by-id",
    deleteFeatureById: "delete-feature",
  },

  // Fuel Type endpoints
  FuelType: {
    createFuelType: "create-fuel-type",
    updateFuelTypeById: "update-fuel-type",
    getAllFuelTypes: "get-all-fuel-types",
    getListFuelTypes: "get-list-fuel-types",
    getFuelTypeById: "get-fuel-type-by-id",
    deleteFuelTypeById: "delete-fuel-type",
  },

  // Manufacturing Years Type endpoints
  ManufacturingYearsType: {
    createManufacturingYearsType: "create-manufacturing-year",
    updateManufacturingYearsTypeById: "update-manufacturing-year",
    getAllManufacturingYearsTypes: "get-all-manufacturing-years",
    getListManufacturingYearsTypes: "get-list-manufacturing-years",
    getManufacturingYearsTypeById: "get-manufacturing-year-by-id",
    deleteManufacturingYearsTypeById: "delete-manufacturing-year",
  },

  // Mileages Type endpoints
  MileagesType: {
    createMileage: "create-mileage",
    updateMileage: "update-mileage",
    getAllMileages: "get-all-mileages",
    getListMileages: "get-list-mileages",
    getMileageById: "get-mileage-by-id",
    deleteMileage: "delete-mileage",
  },

  // Seating Capacities endpoints
  SeatingCapacity: {
    createSeatingCapacity: "create-seating-capacity",
    updateSeatingCapacityById: "update-seating-capacity",
    getAllSeatingCapacities: "get-all-seating-capacities",
    getListSeatingCapacities: "get-list-seating-capacities",
    getSeatingCapacityById: "get-seating-capacity-by-id",
    deleteSeatingCapacityById: "delete-seating-capacity",
  },

  // Product Size endpoints
  ProductSize: {
    createProductSize: "create-size",
    updateProductSizeById: "update-size",
    getAllProductSize: "get-all-size",
    getProductListSizes: "get-list-size",
    getProductSizeById: "get-size-by-id",
    deleteProductSizeById: "delete-size",
  },

  // Transmission Type endpoints
  TransmissionType: {
    createTransmission: "create-transmission",
    updateTransmission: "update-transmission",
    getAllTransmissions: "get-all-transmissions",
    getListTransmissions: "get-list-transmissions",
    getTransmissionById: "get-transmission-by-id",
    deleteTransmission: "delete-transmission",
  },

  // Product Weight endpoints
  ProductWeight: {
    createProductWeight: "create-weight",
    updateProductWeightById: "update-weight",
    getAllProductWeights: "get-all-weight",
    getListProductWeights: "get-list-weight",
    getProductWeightById: "get-weight-by-id",
    deleteProductWeightById: "delete-weight",
  },

  // Cc Type endpoints
  CcType: {
    createCc: "create-cc",
    updateCc: "update-cc",
    getAllMCc: "get-all-ccs",
    getListCc: "get-list-ccs",
    getCcById: "get-cc-by-id",
    deleteCc: "delete-cc",
  },

  // fuelTank  endpoints
  fuelTank: {
    createFT: "create-fuel-tank",
    updateFT: "update-fuel-tank",
    getAllFT: "get-all-fuel-tanks",
    getListFT: "get-list-fuel-tanks",
    getFTById: "get-fuel-tank-by-id",
    deleteFT: "delete-fuel-tank",
  },

  // torque  endpoints
  Torque: {
    createTorque: "create-torque",
    updateTorque: "update-torque",
    getAllTorque: "get-all-torques",
    getListTorque: "get-list-torques",
    getTorqueById: "get-torque-by-id",
    deleteTorque: "delete-torque",
  },

  // seat height  endpoints
  SeatHeight: {
    createSeatHeight: "create-seat-height",
    updateSeatHeight: "update-seat-height",
    getAllSeatHeight: "get-all-seat-heights",
    getListSeatHeight: "get-list-seat-heights",
    getSeatHeightById: "get-seat-height-by-id",
    deleteSeatHeight: "delete-seat-height",
  },

  // Top Speed endpoints
  TopSpeed: {
    createTopSpeed: "create-top-speed",
    updateTopSpeed: "update-top-speed",
    getAllTopSpeed: "get-all-top-speeds",
    getListTopSpeed: "get-list-top-speeds",
    getTopSpeedById: "get-top-speed-by-id",
    deleteTopSpeed: "delete-top-speed",
  },

  // Power endpoints
  Power: {
    createPower: "create-power",
    updatePower: "update-power",
    getAllPower: "get-all-powers",
    getListPower: "get-list-powers",
    getPowerById: "get-power-by-id",
    deletePower: "delete-power",
  },

  // Gearbox endpoints
  Gearbox: {
    createGearbox: "create-gearbox",
    updateGearbox: "update-gearbox",
    getAllGearbox: "get-all-gearboxes",
    getListGearbox: "get-list-gearboxes",
    getGearboxById: "get-gearbox-by-id",
    deleteGearbox: "delete-gearbox",
  },

  // Brakes endpoints
  Brakes: {
    createBrakes: "create-brakes",
    updateBrakes: "update-brakes",
    getAllBrakes: "get-all-brakes",
    getListBrakes: "get-list-brakes",
    getBrakesById: "get-brakes-by-id",
    deleteBrakes: "delete-brakes",
  },

  // Blog endpoints
  blog: {
    getAllBlogs: "get-all-blogs",
    getListBlog: "get-list-blogs",
    getPopularBlogs: "get-popular-blogs",
    getBlogBySlug: "get-blog-by-slug",
    getBlogById: "get-blog-by-id",
    createBlog: "create-blog",
    updateBlog: "update-blog",
    deleteBlog: "delete-blog",
    toggleBlogStatus: "toggle-blog-status",
  },

  // Slider endpoints
  slider: {
    createSlider: "create-slider",
    getAllSliders: "get-all-sliders",
    getListSliders: "get-list-sliders",
    getSliderById: "get-slider-by-id",
    updateSlider: "update-slider",
    deleteSlider: "delete-slider",
    toggleSliderStatus: "toggle-slider-status",
    updateDisplayOrder: "update-display-order",
  },

  // Brand endpoints
  brand: {
    createBrand: "create-brand",
    updateBrandById: "update-brand",
    getAllBrands: "get-all-brands",
    getListBrands: "get-list-brands",
    getBrandById: "get-brand-by-id",
    deleteBrandById: "delete-brand",
  },

  // Category endpoints
  category: {
    createCategory: "create-category",
    updateCategoryById: "update-category",
    getAllCategory: "get-all-categories",
    getListCategory: "get-list-categories",
    getCategoryById: "get-category-by-id",
    deleteBCategoryById: "delete-category",
  },

  // Settings endpoints
  settings: {
    updatePassword: "update-password",
    updateSettings: "create-update-settings",
    getSettings: "get-settings",
  },

  emailSend: {
    createEmail: "create-email",
  },

  comments: {
    createComment: "create-comment",
    getBlogCommentsById: "blog-comment",
  },

  author: {
    getAuthorById: "author-profile",
  },
};
