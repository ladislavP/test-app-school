import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { Button } from './Button';
import { Input } from './Input';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: unknown) => void;
  className?: string;
  title?: string;
  allowManualInput?: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({
  onScan,
  onError,
  className,
  title = "QR Scanner",
  allowManualInput = true
}) => {
  const [isActive, setIsActive] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState<string>('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if camera is available
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          // Stop the stream immediately, we just wanted to check permission
          stream.getTracks().forEach(track => track.stop());
          setHasPermission(true);
        })
        .catch(() => {
          setHasPermission(false);
        });
    } else {
      setHasPermission(false);
    }
  }, []);

  const handleScan = useCallback((detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue;
      console.log('QR Code scanned:', result);
      setIsActive(false);
      onScan(result);
    }
  }, [onScan]);

  const handleError = useCallback((error: unknown) => {
    console.error('QR Scanner Error:', error);
    setError('Scanner error occurred. Please try manual input.');
    setIsActive(false);
    onError?.(error);
  }, [onError]);

  const startScanning = () => {
    setError('');
    setIsActive(true);
  };

  const stopScanning = () => {
    setIsActive(false);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode('');
    }
  };

  return (
    <div className={cn('w-full max-w-md mx-auto space-y-4', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-center text-white">{title}</h3>
      )}

      {/* Camera Scanner */}
      {hasPermission && (
        <Card variant="glass" className="border-white/20">
          <CardContent className="p-4">
            {isActive ? (
              <div ref={scannerRef} className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <Scanner
                    onScan={handleScan}
                    onError={handleError}
                    formats={['qr_code']}
                    scanDelay={500}
                    allowMultiple={false}
                    styles={{
                      container: { width: '100%', height: '100%' },
                      video: { width: '100%', height: '100%', objectFit: 'cover' }
                    }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={stopScanning} className="text-white border-white/30">
                    Zastaviť skener
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <p className="text-white/80 mb-4">Ready to scan QR codes</p>
                <Button onClick={startScanning} className="bg-white text-gray-900 hover:bg-white/90">
                  Zapnúť kameru
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Manual Input */}
      {allowManualInput && (
        <Card variant="glass" className="border-white/20">
          <CardContent className="p-4">
            <div className="space-y-3">
              <p className="text-white/80 text-sm text-center">
                {hasPermission === false ? 'Camera not available. ' : ''}
                Zadajte kód ručne:
              </p>
              <Input
                placeholder="Enter device code..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
                className="bg-white/10 border-white/30 text-white placeholder-white/60"
              />
              <Button
                onClick={handleManualSubmit}
                disabled={!manualCode.trim()}
                className="w-full bg-white text-gray-900 hover:bg-white/90"
              >
                Potvrdiť
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { QRScanner };

