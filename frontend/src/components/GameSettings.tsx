
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GameSettings } from '@/types/game';

interface GameSettingsProps {
  currentSettings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

const GameSettingsDialog: React.FC<GameSettingsProps> = ({
  currentSettings,
  onSettingsChange
}) => {
  const [settings, setSettings] = useState<GameSettings>(currentSettings);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onSettingsChange(settings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Game Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Game Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipeLength">Recipe Length</Label>
            <Select 
              value={settings.recipeLength.toString()} 
              onValueChange={(value) => setSettings({
                ...settings,
                recipeLength: parseInt(value)
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recipe length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Ingredients (Easy)</SelectItem>
                <SelectItem value="4">4 Ingredients (Medium)</SelectItem>
                <SelectItem value="5">5 Ingredients (Hard)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxAttempts">Maximum Attempts</Label>
            <Select 
              value={settings.maxAttempts.toString()} 
              onValueChange={(value) => setSettings({
                ...settings,
                maxAttempts: parseInt(value)
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select max attempts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 Attempts (Hard)</SelectItem>
                <SelectItem value="8">8 Attempts (Medium)</SelectItem>
                <SelectItem value="10">10 Attempts (Easy)</SelectItem>
                <SelectItem value="12">12 Attempts (Very Easy)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <RadioGroup 
              value={settings.difficultyLevel}
              onValueChange={(value) => setSettings({
                ...settings,
                difficultyLevel: value as 'easy' | 'medium' | 'hard'
              })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettingsDialog;
