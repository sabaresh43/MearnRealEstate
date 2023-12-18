import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regualarPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  bhk: {
    type: Number,
    required: true,
  },
  attachedBathroom: {
    type: Boolean,
    required: true,
  },
  furnsihed: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  saleType: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: Array,
    required: true,
  },

  userRef: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

const Listing = mongoose.model('Listing',listingSchema);

export default Listing
