export type NonPhotoProps = { title: string, message: string, handleYes: () => void, handleClose: () => void }
export type ModalProps = { title: string, message: string, open: boolean, handleClose: () => void, handleYes: () => void, srcPhoto?: string, modalType?: string }
export type PhotoProps = { srcPhoto: string };
