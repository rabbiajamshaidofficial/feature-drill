import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const settingsSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(200, 'Bio cannot exceed 200 characters').optional(),
  notifications: z.boolean().default(true),
});

export default function UserSettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: 'umerjamshaid',
      email: 'umer@example.com',
      bio: 'Full-stack developer building AI workflows.',
      notifications: true,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatusMessage({ type: 'success', text: 'Settings updated successfully!' });
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Failed to update settings. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>

      {statusMessage && (
        <div
          role="alert"
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            aria-invalid={errors.username ? 'true' : 'false'}
            aria-describedby={errors.username ? 'username-error' : undefined}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.username
                ? 'border-rose-300 focus:ring-rose-500'
                : 'border-gray-300 focus:ring-gray-900'
            }`}
          />
          {errors.username && (
            <p id="username-error" role="alert" className="mt-1 text-xs text-rose-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-rose-300 focus:ring-rose-500'
                : 'border-gray-300 focus:ring-gray-900'
            }`}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-rose-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            {...register('bio')}
            aria-invalid={errors.bio ? 'true' : 'false'}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.bio
                ? 'border-rose-300 focus:ring-rose-500'
                : 'border-gray-300 focus:ring-gray-900'
            }`}
          />
          {errors.bio && (
            <p id="bio-error" role="alert" className="mt-1 text-xs text-rose-600">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            id="notifications"
            type="checkbox"
            {...register('notifications')}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
          />
          <label htmlFor="notifications" className="text-sm text-gray-700">
            Email Notifications for Account Activity
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <span>Save Settings</span>
          )}
        </button>
      </form>
    </div>
  );
}