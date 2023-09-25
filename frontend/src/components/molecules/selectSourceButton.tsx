import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import {Box, Button, Icon, Stack} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AccentButton, RegularButton } from '@chainlit/components';

import useClearChat from 'hooks/clearChat';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import cloneDeep from "lodash.clonedeep";
export default function SelectSourceButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const clearChat = useClearChat();

  const [items, setItems] = useState([ { id: 1, name: 'PDF1', description: 'Something...', selected: false }, { id: 2, name: 'PDF2', description: 'Something...', selected: false } ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const selectedSource = items.find((item) => item.selected);
    console.log('SELECTED ITEM', selectedSource);
    clearChat();
    navigate('/');
    handleClose();
  };

  return (
    <Box>
      <AccentButton
        id="new-chat-button"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Select Source
      </AccentButton>
      <Dialog
        open={open}
        onClose={handleClose}
        id="select-source-dialog"
        PaperProps={{
          sx: {
            backgroundImage: 'none'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Select a source'}
        </DialogTitle>
        <DialogContent>
          {/*<DialogContentText id="alert-dialog-description">*/}
          {/*  This will clear the current messages and start a new chat.*/}
          {/*</DialogContentText>*/}
          {/*List of sources using Stack and Box*/}

          <Stack spacing={2}>
            {
              items.map((item) => {
                return (
                  <Button  key={item.id} onClick={() => {
                    const allItems = cloneDeep(items);
                    allItems.forEach((elem) => {
                      elem.selected = elem.id === item.id;
                    });
                    setItems([...allItems]);
                  }} sx={{display: 'flex', flexDirection: 'row', border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, justifyContent: 'flex-start'}} style={{width: '400px'}}>
                      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} flex={1}>
                          <Icon sx={{fontSize: 40, color: 'grey.500'}}>
                            {
                              item.selected ? <CheckCircleOutlineIcon color={'success'} /> : <RadioButtonUncheckedIcon/>
                            }
                          </Icon>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}} flex={9}>
                          <Box sx={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Box>
                          <Box sx={{fontSize: 14, color: 'grey.500'}}>{item.description}</Box>
                        </Box>
                      </Box>
                  </Button>

                )
              } )
            }


          </Stack>

        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <RegularButton onClick={handleClose}>Cancel</RegularButton>
          <AccentButton
            id="confirm"
            variant="outlined"
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </AccentButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
