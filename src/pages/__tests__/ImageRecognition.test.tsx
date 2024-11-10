import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageRecognition from '../ImageRecognition';
import * as mobilenet from '@tensorflow-models/mobilenet';

import '@tensorflow/tfjs-backend-webgl';
jest.mock('@tensorflow-models/mobilenet');
jest.mock('@tensorflow/tfjs');

describe('ImageRecognition Component', () => {
    /**
     * Clears all mocks before each test.
     */
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test to ensure the MobileNet model loads on component mount.
     */
    it('Loads the MobileNet model on mount', async () => {
        const mockLoad = mobilenet.load as jest.Mock;
        mockLoad.mockResolvedValue({ classify: jest.fn() });

        render(<ImageRecognition />);

        await waitFor(() => expect(mockLoad).toHaveBeenCalled());
    });

    /**
     * Test to ensure an image can be uploaded and the image URL is set.
     */
    it('uploads an image and sets the image URL', () => {
        render(<ImageRecognition />);
        const fileInput = screen.getByLabelText(/upload image/i);
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByAltText(/upload preview/i)).toBeInTheDocument();
    });

    /**
     * Test to ensure an image can be captured from the webcam and the image URL is set.
     */
    it('captures an image from the webcam and sets the image URL', async () => {
        render(<ImageRecognition />);
        const startCameraButton = screen.getByText(/start camera/i);

        fireEvent.click(startCameraButton);
        const captureButton = screen.getByText(/capture image/i);

        fireEvent.click(captureButton);

        await waitFor(() => expect(screen.getByAltText(/upload preview/i)).toBeInTheDocument());
    });

    /**
     * Test to ensure objects in the image are identified and results are displayed.
     */
    it('identifies objects in the image and displays results', async () => {
        const mockClassify = jest.fn().mockResolvedValue([
            { className: 'plastic bottle', probability: 0.9 }
        ]);
        const mockLoad = mobilenet.load as jest.Mock;
        mockLoad.mockResolvedValue({ classify: mockClassify });

        render(<ImageRecognition />);
        const fileInput = screen.getByLabelText(/upload image/i);
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        const identifyButton = screen.getByText(/identify image/i);

        fireEvent.click(identifyButton);

        await waitFor(() => expect(screen.getByText(/plastic bottle/i)).toBeInTheDocument());
    });

    /**
     * Test to ensure a message is displayed if no recyclable items are recognized.
     */
    it('displays a message if no recyclable items are recognized', async () => {
        const mockClassify = jest.fn().mockResolvedValue([]);
        const mockLoad = mobilenet.load as jest.Mock;
        mockLoad.mockResolvedValue({ classify: mockClassify });

        render(<ImageRecognition />);
        const fileInput = screen.getByLabelText(/upload image/i);
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        const identifyButton = screen.getByText(/identify image/i);

        fireEvent.click(identifyButton);

        await waitFor(() => expect(screen.getByText(/no recyclable items recognized/i)).toBeInTheDocument());
    });

    /**
     * Test to ensure clicking on a guess updates the total points.
     */
    it('handles click on a guess and updates total points', async () => {
        const mockClassify = jest.fn().mockResolvedValue([
            { className: 'plastic bottle', probability: 0.9 }
        ]);
        const mockLoad = mobilenet.load as jest.Mock;
        mockLoad.mockResolvedValue({ classify: mockClassify });

        render(<ImageRecognition />);
        const fileInput = screen.getByLabelText(/upload image/i);
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        const identifyButton = screen.getByText(/identify image/i);

        fireEvent.click(identifyButton);

        await waitFor(() => {
            const guess = screen.getByText(/plastic bottle/i);
            fireEvent.click(guess);
            expect(screen.getByText(/total points/i)).toHaveTextContent('10');
        });
    });
});