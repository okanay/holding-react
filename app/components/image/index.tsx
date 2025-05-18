import useClickOutside from "@/hooks/use-click-outside";
import {
  Check,
  Clock,
  EyeIcon,
  Image as ImageIcon,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
  Filter,
  ChevronDown,
  Briefcase,
  Newspaper,
  PenSquare,
  Image,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useImage } from "./store";
import { ImageType } from "./types";

// Kategori seçenekleri
const CATEGORY_OPTIONS = [
  { value: "general", label: "Genel", icon: Image },
  { value: "job_posts", label: "İş İlanları", icon: Briefcase },
  { value: "press", label: "Basın", icon: Newspaper },
  { value: "blog", label: "Blog", icon: PenSquare },
];

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Seçilen görsel için callback fonksiyonu
  onImageSelect?: (image: ImageType) => void;
  // Tek veya çoklu seçim modu
  singleSelect?: boolean;
  // Başlangıçta seçili olacak görsel ID'si
  initialSelectedId?: string;
  // Açılacak başlangıç sekmesi
  initialTab?: "gallery" | "upload";
  // Modal başlığı
  title?: string;
  // Varsayılan kategori
  defaultCategory?: string;
  // İzin verilen kategoriler (boş ise tümü gösterilir)
  allowedCategories?: string[];
  //
  portalId?: string;
}

// Ana Modal Bileşeni
const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onImageSelect,
  singleSelect = true,
  initialSelectedId,
  initialTab = "gallery",
  title = "Resim Yöneticisi",
  defaultCategory = "images",
  allowedCategories = [],
  portalId,
}) => {
  const {
    images,
    selectedImage,
    isLoading,
    fetchImages,
    selectImage,
    deleteImage,
    uploadImage,
    currentCategory,
    setCategory,
  } = useImage();

  const [tab, setTab] = useState<"upload" | "gallery">(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => handleClose());
  const categoryRef = useClickOutside<HTMLDivElement>(
    () => setCategoryMenuOpen(false),
    categoryMenuOpen,
  );

  // Filtrelenmiş kategori listesi
  const filteredCategories =
    allowedCategories.length > 0
      ? CATEGORY_OPTIONS.filter((cat) => allowedCategories.includes(cat.value))
      : CATEGORY_OPTIONS;

  // Geçerli kategoriyi bul
  const currentCategoryOption =
    CATEGORY_OPTIONS.find((cat) => cat.value === currentCategory) ||
    CATEGORY_OPTIONS[0];

  // Modal açıldığında resimleri yükle
  useEffect(() => {
    if (!isOpen) return;
    setCategory(defaultCategory);
    fetchImages(defaultCategory);
    selectImage(initialSelectedId);
  }, [isOpen]);

  // Modal kapatıldığında temizlik yap
  const handleClose = () => {
    if (selectedFile) {
      URL.revokeObjectURL(URL.createObjectURL(selectedFile));
    }
    setSelectedFile(null);
    setAltText("");
    setSearchQuery("");
    onClose();
  };

  // Görsel seçme işlemi
  const handleSelectImage = (image: ImageType) => {
    selectImage(image.id);
    // Callback fonksiyonu varsa çağır
    if (onImageSelect) {
      console.log("run");
      onImageSelect(image);
    }
    // Tek seçim modunda modal otomatik kapanır
    if (singleSelect) {
      handleClose();
    }
  };

  // Görsel seçme butonunu aktifleştir
  const handleConfirmSelection = () => {
    if (selectedImage?.imageData && onImageSelect) {
      onImageSelect(selectedImage.imageData);
    } else {
      toast.error("Lütfen bir görsel seçin");
    }
  };

  // Dosya seçimi
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // Input değerini sıfırla (aynı dosyayı tekrar seçebilmek için)
      e.target.value = "";
    }
  };

  // Dosya seçme dialogunu açma
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // Drag & Drop olayları
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      } else {
        toast.error("Lütfen bir görsel dosyası seçin");
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    console.log("Kategori değiştiriliyor:", category);
    setCategory(category);
    setCategoryMenuOpen(false);

    // Kategori değiştiğinde mevcut seçimi temizle
    if (selectedImage?.imageData) {
      selectImage(null);
    }
  };

  // Dosya yükleme işlevi - ImageModal.tsx içinde
  const handleStartUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      console.log(`Dosya yükleniyor, kategori: ${currentCategory}`);

      const uploadedImage = await uploadImage(
        selectedFile,
        currentCategory, // Mevcut kategoriyi kullan
        altText,
      );

      if (uploadedImage && onImageSelect) {
        // Yeni yüklenen görseli seç ve callback fonksiyonunu çağır
        selectImage(uploadedImage.id);
        onImageSelect(uploadedImage);

        // Tek seçim modunda modal otomatik kapanır
        if (singleSelect) {
          return;
        }
      }

      // Yükleme sonrası temizlik
      setSelectedFile(null);
      setAltText("");
      // Galeri sekmesine geç
      setTab("gallery");
    } catch (error) {
      console.error("Yükleme hatası:", error);
      toast.error("Dosya yüklenirken bir hata oluştu");
    } finally {
      setIsUploading(false);
    }
  };

  // Filtreleme
  const filteredImages = images.filter((image) => {
    if (!searchQuery) return true;
    return (
      image.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (image.altText &&
        image.altText.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-zinc-950/60 p-4">
      <div
        ref={modalRef}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-4">
          <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
            {title}
          </h2>
          <div className="flex items-center">
            <button
              type="button"
              className={`mr-2 border-b-2 px-3 py-2 font-medium transition-colors md:px-4 md:py-3 ${
                tab === "gallery"
                  ? "border-primary-500 text-primary-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab("gallery")}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <ImageIcon size={18} />
                <span className="text-xs sm:text-sm">Galeri</span>
              </div>
            </button>
            <button
              type="button"
              className={`border-b-2 px-3 py-2 font-medium transition-colors md:px-4 md:py-3 ${
                tab === "upload"
                  ? "border-primary-500 text-primary-500"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setTab("upload")}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <Upload size={18} />
                <span className="text-xs sm:text-sm">Yükle</span>
              </div>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="ml-2 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="relative flex-1 overflow-auto">
          {tab === "upload" ? (
            <div className="p-4">
              {/* Kategori Seçimi */}
              {filteredCategories.length > 1 && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Dosya Kategorisi
                  </label>
                  <div className="relative" ref={categoryRef}>
                    <button
                      type="button"
                      onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                      className="flex w-full items-center justify-between rounded-md border border-zinc-300 bg-white px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-50"
                    >
                      <div className="flex items-center gap-2">
                        {React.createElement(currentCategoryOption.icon, {
                          size: 16,
                          className: "text-zinc-500",
                        })}
                        <span>{currentCategoryOption.label}</span>
                      </div>
                      <ChevronDown size={16} className="text-zinc-500" />
                    </button>

                    {categoryMenuOpen && (
                      <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-lg">
                        <div className="py-1">
                          {filteredCategories.map((category) => (
                            <button
                              key={category.value}
                              type="button"
                              onClick={() =>
                                handleCategoryChange(category.value)
                              }
                              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-100 ${
                                currentCategory === category.value
                                  ? "text-primary-500 bg-zinc-50 font-medium"
                                  : ""
                              }`}
                            >
                              {React.createElement(category.icon, { size: 16 })}
                              <span>{category.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dosya Sürükleme Alanı */}
              <div
                className={`rounded-lg border-2 border-dashed p-4 text-center md:p-8 ${
                  dragActive
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*"
                />
                {React.createElement(currentCategoryOption.icon, {
                  size: 30,
                  className: "mx-auto mb-2 text-gray-400 md:mb-4 md:text-4xl",
                })}
                <h3 className="mb-1 text-base font-medium text-gray-700 md:mb-2 md:text-lg">
                  {dragActive
                    ? "Dosyayı Buraya Bırakın"
                    : `${currentCategoryOption.label} Yüklemek İçin Tıklayın veya Sürükleyin`}
                </h3>
                <p className="mb-3 text-xs text-gray-500 md:mb-6 md:text-sm">
                  PNG, JPG, WEBP ve SVG formatları desteklenir
                </p>
                <button
                  type="button"
                  onClick={handleClickUpload}
                  className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-300 rounded-md px-4 py-2 text-xs text-white transition-colors focus:ring-2 focus:outline-none md:px-6 md:py-2.5 md:text-sm"
                >
                  Dosya Seç
                </button>
              </div>

              {/* Seçili Dosya Önizleme */}
              {selectedFile && (
                <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-4">
                  <h3 className="mb-3 font-medium text-zinc-700">
                    Seçilen Dosya
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-md bg-zinc-100">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Önizleme"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-700">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Dosya Yükleme Butonu */}
              {selectedFile && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleStartUpload}
                    disabled={isUploading}
                    className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />{" "}
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload size={16} /> Yükle
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <div className="mb-4 space-y-3">
                {/* Kategori ve Arama Filtresi */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Kategori Seçici */}
                  {filteredCategories.length > 1 && (
                    <div className="relative" ref={categoryRef}>
                      <button
                        type="button"
                        onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                        className="flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm transition-colors hover:bg-zinc-50"
                      >
                        <Filter size={16} className="text-zinc-500" />
                        <span>{currentCategoryOption.label}</span>
                        <ChevronDown size={16} className="text-zinc-500" />
                      </button>

                      {categoryMenuOpen && (
                        <div className="absolute top-full left-0 z-10 mt-1 min-w-[180px] rounded-md border border-zinc-200 bg-white shadow-lg">
                          <div className="py-1">
                            {filteredCategories.map((category) => (
                              <button
                                key={category.value}
                                type="button"
                                onClick={() =>
                                  handleCategoryChange(category.value)
                                }
                                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-100 ${
                                  currentCategory === category.value
                                    ? "text-primary-500 bg-zinc-50 font-medium"
                                    : ""
                                }`}
                              >
                                {React.createElement(category.icon, {
                                  size: 16,
                                })}
                                <span>{category.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Arama */}
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Dosya adı veya alt metin ara..."
                      className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
                    />
                  </div>

                  {/* Yenile Butonu */}
                  <button
                    type="button"
                    onClick={() => fetchImages(currentCategory)}
                    disabled={isLoading}
                    className={`text-primary-500 hover:text-primary-700 border-primary-300 flex items-center gap-1 rounded-md border px-3 py-2 text-sm transition-colors ${
                      isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <RefreshCw
                      size={16}
                      className={`${isLoading ? "animate-spin" : ""}`}
                    />
                    <span>Yenile</span>
                  </button>
                </div>
              </div>

              {/* Resimleri Göster */}
              {isLoading ? (
                <div className="flex h-48 items-center justify-center">
                  <div className="flex flex-col items-center">
                    <RefreshCw
                      size={30}
                      className="text-primary-500 animate-spin"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Dosyalar yükleniyor...
                    </p>
                  </div>
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center">
                  {React.createElement(currentCategoryOption.icon, {
                    size: 40,
                    className: "mb-3 text-gray-300",
                  })}
                  {searchQuery ? (
                    <p className="text-center text-gray-500">
                      Aramanızla eşleşen dosya bulunamadı
                    </p>
                  ) : (
                    <>
                      <p className="text-center text-gray-500">
                        Henüz dosya yüklenmemiş
                      </p>
                      <button
                        type="button"
                        onClick={() => setTab("upload")}
                        className="text-primary-500 hover:text-primary-600 mt-3 text-sm font-medium"
                      >
                        İlk dosyanızı yükleyin
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,_minmax(140px,_1fr))]">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className={`group hover:border-primary-500 relative aspect-square size-full cursor-pointer overflow-hidden rounded-md border-2 ${
                        selectedImage?.imageData?.id === image.id
                          ? "border-primary-500"
                          : "border-zinc-200"
                      } bg-gray-100 transition-all`}
                      onClick={() => handleSelectImage(image)}
                    >
                      {/* Resim */}
                      <div className="h-full w-full">
                        <img
                          src={image.url}
                          alt={image.altText || image.filename}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="bg-opacity-100 group-hover:bg-opacity-30 absolute inset-0 flex flex-col justify-between bg-zinc-950/40 opacity-0 transition-all group-hover:opacity-100">
                        {/* Üst kısım - Seçim işareti */}
                        <div className="flex justify-end p-2">
                          {selectedImage?.imageData?.id === image.id && (
                            <div className="bg-primary-500 rounded-full p-1 shadow-md">
                              <Check size={16} className="text-white" />
                            </div>
                          )}
                        </div>

                        {/* Alt kısım - Bilgiler ve butonlar */}
                        <div className="p-2">
                          {/* İşlem butonları */}
                          <div className="mb-2 flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  confirm(
                                    "Bu dosyayı silmek istediğinize emin misiniz?",
                                  )
                                ) {
                                  deleteImage(image.id);
                                }
                              }}
                              className="rounded-full bg-white/90 p-1.5 text-red-500 shadow-md transition-colors hover:bg-red-500 hover:text-white"
                              title="Dosyayı sil"
                            >
                              <Trash2 size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(image.url, "_blank");
                              }}
                              className="text-primary-500 hover:bg-primary-500 rounded-full bg-white/90 p-1.5 shadow-md transition-colors hover:text-white"
                              title="Orijinal dosyayı aç"
                            >
                              <EyeIcon size={16} />
                            </button>
                          </div>

                          {/* Bilgi alanı */}
                          <div className="bg-opacity-50 rounded-md bg-zinc-950 p-1.5 text-xs text-white">
                            <div className="truncate">{image.filename}</div>
                            <div className="mt-0.5 flex justify-between text-[10px] text-white/80">
                              {image.fileCategory && (
                                <span className="bg-primary-500/50 rounded-sm px-1 py-0.5">
                                  {CATEGORY_OPTIONS.find(
                                    (c) => c.value === image.fileCategory,
                                  )?.label || image.fileCategory}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                {new Date(image.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 border-t border-zinc-200 p-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
          >
            Kapat
          </button>

          {tab === "gallery" && onImageSelect && !singleSelect && (
            <button
              type="button"
              onClick={handleConfirmSelection}
              disabled={!selectedImage?.imageData}
              className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-300 rounded-md px-4 py-2 text-sm text-white transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              Seç
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    typeof document !== "undefined" && document.body
      ? document.querySelector(portalId) || document.body
      : undefined,
  );
};

export default ImageModal;
