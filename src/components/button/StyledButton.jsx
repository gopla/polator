import { Button } from '@mui/material'

const StyledButton = ({ handleEvent, children }) => {
  return (
    <Button
      variant="contained"
      onClick={handleEvent}
      sx={{
        backgroundColor: 'var(--red-color)',
        color: '#fff ',
        '&:hover': {
          backgroundColor: 'var(--black-color)',
          color: 'white',
          boxShadow: 'none'
        }
      }}
    >
      {children}
    </Button>
  )
}

export default StyledButton
