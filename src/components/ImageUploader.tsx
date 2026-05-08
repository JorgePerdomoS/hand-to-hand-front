import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

interface Props {
    value: string
    onChange: (base64: string) => void
}

export default function ImageUploader({ value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            onChange(reader.result as string) // guarda data:image/...;base64,...
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className="space-y-2">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
            />

            <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="gap-2"
            >
                <Upload className="h-4 w-4" />
                Subir imagen
            </Button>

            {value && (
                <img
                    src={value}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border"
                />
            )}
        </div>
    )
}