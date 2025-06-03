import React, { useState, useCallback, useEffect } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { Button } from './Button';
import { Input } from './Input';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';

interface AdvancedQRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: unknown) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  allowManualInput?: boolean;
  placeholder?: string;
}

const AdvancedQRScanner: React.FC<AdvancedQRScannerProps> = ({
  onScan,
  onError,
  className,
  title = "Scan QR Code",
  subtitle = "Position the QR code within the camera frame",
  allowManualInput = true,
  placeholder = "Or enter code manually"
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isLoading, setIsLoading] = useState(false);

  // Check camera permission on mount
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
        setCameraPermission('granted');
      } else {
        setError('Camera not supported on this device');
        setCameraPermission('denied');
      }
    } catch (err) {
      console.error('Camera permission check failed:', err);
      setCameraPermission('denied');
    }
  };

  const handleScan = useCallback((detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue;
      console.log('QR Code detected:', result);
      setScanResult(result);
      setError('');
      
      // Stop scanning and call onScan
      setIsScanning(false);
      onScan(result);
    }
  }, [onScan]);

  const handleError = useCallback((error: unknown) => {
    console.error('QR Scanner Error:', error);
    
    let errorMessage = 'Scanner error occurred';
    
    if (error instanceof Error) {
      if (error.message.includes('Permission denied') || error.message.includes('NotAllowedError')) {
        setCameraPermission('denied');
        errorMessage = 'Camera permission denied. Please enable camera access in your browser settings.';
      } else if (error.message.includes('NotFoundError') || error.message.includes('DevicesNotFoundError')) {
        errorMessage = 'No camera found on this device.';
      } else if (error.message.includes('NotReadableError')) {
        errorMessage = 'Camera is already in use by another application.';
      } else {
        errorMessage = error.message || 'Camera error occurred';
      }
    }
    
    setError(errorMessage);
    setIsScanning(false);
    onError?.(error);
  }, [onError]);

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode('');
    }
  };

  const startScanning = async () => {
    setIsLoading(true);
    setError('');
    setScanResult('');
    
    try {
      if (cameraPermission === 'denied') {
        await requestCameraPermission();
      }
      
      if (cameraPermission === 'granted') {
        setIsScanning(true);
      }
    } catch (err) {
      console.error('Failed to start scanning:', err);
      setError('Failed to start camera');
    } finally {
      setIsLoading(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    setError('');
    setScanResult('');
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after getting permission
      setCameraPermission('granted');
      setError('');
      return true;
    } catch (err) {
      console.error('Camera permission denied:', err);
      setCameraPermission('denied');
      setError('Camera permission denied. Please enable camera access in your browser settings.');
      return false;
    }
  };

  return (
    <div className={cn('w-full max-w-md mx-auto space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>

      {/* Scanner Card */}
      <Card variant="glass" className="overflow-hidden border-white/20">
        <CardContent className="p-0">
          {isScanning ? (
            <div className="relative aspect-square">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                formats={['qr_code']}
                scanDelay={300}
                allowMultiple={false}
                styles={{
                  container: {
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  },
                  video: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  },
                }}
                components={{
                  finder: false, // We'll use our custom finder
                }}
              />
              
              {/* Custom Scanner Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner brackets */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    {/* Top-left corner */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-white"></div>
                    {/* Top-right corner */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-white"></div>
                    {/* Bottom-left corner */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-white"></div>
                    {/* Bottom-right corner */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-white"></div>
                    
                    {/* Scanning line */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div 
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"
                        style={{
                          top: '50%',
                          animation: 'scan-line 2s ease-in-out infinite',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Success indicator */}
                {scanResult && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                    <div className="bg-emerald-500 text-white p-4 rounded-full animate-bounce">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Scanner status */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-center">
                  <p className="text-white text-sm font-medium">
                    {scanResult ? '✅ Code detected!' : '📷 Scanning for QR code...'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <div className="text-center space-y-4 p-6">
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold mb-2">
                    {cameraPermission === 'denied' ? 'Camera Access Required' : 'Ready to Scan'}
                  </p>
                  <p className="text-white/80 text-sm mb-4">
                    {cameraPermission === 'denied' 
                      ? 'Prosím povoľte prístup ku kamere'
                      : 'Kliknite na tlačidlo nižšie a spustite skenovanie'
                    }
                  </p>
                  <Button 
                    onClick={startScanning}
                    disabled={isLoading}
                    className="bg-white text-gray-900 hover:bg-white/90"
                  >
                    {isLoading ? 'Starting...' : cameraPermission === 'denied' ? 'Povoľte prístup ku kamere' : 'Začať skenovať'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card variant="glass" className="border-red-500/30 bg-red-500/10">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">Chyba skenovania</h4>
                <p className="text-white/80 text-sm">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="space-y-4">
        {/* Scanner Controls */}
        {isScanning && (
          <Button
            variant="outline"
            className="w-full text-white border-white/30 hover:bg-white/10"
            onClick={stopScanning}
          >
            Stop Scanning
          </Button>
        )}

        {/* Manual Input */}
        {allowManualInput && (
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-white/80 text-sm">Nedarí sa skenovať? Zadajte kód manuálne.</p>
            </div>
            <Input
              placeholder={placeholder}
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
              className="bg-white/10 border-white/30 text-white placeholder-white/60"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
              }
            />
            <Button
              className="w-full bg-white text-gray-900 hover:bg-white/90"
              onClick={handleManualSubmit}
              disabled={!manualCode.trim()}
            >
              Potvrdiť
            </Button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scan-line {
          0% { top: 10%; opacity: 1; }
          50% { top: 50%; opacity: 0.8; }
          100% { top: 90%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdvancedQRScanner;

