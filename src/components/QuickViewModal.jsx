import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Check, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../services/api';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    setIsCheckoutOpen,
    showToast,
    fetchProducts,
  } = useStore();

  const { isAuthenticated, setIsAuthOpen } = useAuth();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product._id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reviews'

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please sign in to submit a review', 'info');
      setIsAuthOpen(true);
      return;
    }
    if (!newComment.trim()) return;

    setSubmittingReview(true);
    try {
      const updatedData = await apiCall(`/products/${product._id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ rating: newRating, comment: newComment }),
      });
      showToast('Review submitted successfully!');
      setNewComment('');
      // Update quickView product reviews locally
      setQuickViewProduct({
        ...product,
        reviews: updatedData.reviews,
        rating: updatedData.rating,
        numReviews: updatedData.reviews.length,
      });
      fetchProducts();
    } catch (err) {
      showToast(err.message || 'Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel border border-slate-700/60 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square w-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img ? 'border-purple-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-slate-200">{product.rating}</span>
                    <span className="text-slate-500">({product.numReviews} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-100 mb-2">{product.name}</h1>
                <p className="text-xs text-slate-400 mb-4">{product.tagline || product.brand}</p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-extrabold text-slate-100">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-800 mb-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider mr-6 border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Reviews ({product.reviews?.length || 0})
                  </button>
                </div>

                {activeTab === 'overview' ? (
                  <div className="space-y-5">
                    <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>

                    {/* Features List */}
                    {product.features && (
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-purple-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Color Selector */}
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold text-slate-300 block mb-2">
                          Color: <span className="text-purple-300 font-bold">{selectedColor}</span>
                        </span>
                        <div className="flex items-center gap-2.5">
                          {product.colors.map((col) => (
                            <button
                              key={col.name}
                              onClick={() => setSelectedColor(col.name)}
                              className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                                selectedColor === col.name ? 'border-purple-400 scale-110' : 'border-transparent'
                              }`}
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size Selector */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold text-slate-300 block mb-2">
                          Size: <span className="text-purple-300 font-bold">{selectedSize}</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setSelectedSize(sz)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                selectedSize === sz
                                  ? 'bg-purple-600/30 text-purple-300 border-purple-500'
                                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity Stepper */}
                    <div>
                      <span className="text-xs font-semibold text-slate-300 block mb-2">Quantity</span>
                      <div className="flex items-center gap-3 w-fit bg-slate-900 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-100">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Reviews Tab */
                  <div className="space-y-4">
                    {/* Submit Review Form */}
                    <form onSubmit={handleSubmitReview} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Leave a Review</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Rating:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewRating(star)}
                              className="text-amber-400 focus:outline-none"
                            >
                              <Star className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        rows="2"
                        placeholder="Write your thoughts on this item..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all"
                      >
                        {submittingReview ? 'Submitting...' : 'Post Review'}
                      </button>
                    </form>

                    {/* Review List */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-200">{rev.userName}</span>
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-slate-300">{rev.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic text-center py-4">No reviews yet. Be the first to review!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-bold text-xs border border-purple-500/40 transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 transition-all active:scale-95"
                >
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isSaved ? 'bg-rose-500/20 text-rose-400 border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
