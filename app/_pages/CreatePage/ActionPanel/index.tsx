'use client'

import {
  IconAlertTriangle,
  IconCalculator,
  IconSquarePlus,
  IconTrash
} from '@tabler/icons-react'

import { Button } from 'app/_components/Button'
import Linker from 'app/_components/Linker'
import Errors from 'app/_utils/errors'
import { forwardRef, useState } from 'react'
import DropdownOptions from 'app/_modules/DropdownOptions'
import DryRunCalculator from '../PromptInput/DryRunCalculator'
import DeleteConfirmModal from 'app/_modules/DeleteConfirmModal'
import useLockedBody from 'app/_hooks/useLockedBody'
import styles from './actionPanel.module.css'
import { useInput } from 'app/_modules/InputProvider/context'
import clsx from 'clsx'
import { useInputErrors } from 'app/_modules/ErrorProvider/context'
import { useModal } from '@ebay/nice-modal-react'
import Modal from 'app/_componentsV2/Modal'
import ErrorsPanel from './ErrorsPanel'

interface Props {
  errors: { [key: string]: boolean }
  disableSubmit?: boolean
  resetInput: () => void
  handleSubmit: () => void
  isFixed?: boolean
  pending: boolean
  totalImagesRequested: number
  loggedIn: boolean | null
  totalKudosCost: number
  kudosPerImage: string
  showStylesDropdown?: boolean
}

const ActionPanel = forwardRef<HTMLDivElement, Props>(
  (
    {
      disableSubmit = false,
      errors,
      resetInput,
      handleSubmit,
      isFixed,
      pending,
      totalImagesRequested,
      loggedIn = false,
      totalKudosCost,
      kudosPerImage
    }: Props,
    ref
  ) => {
    const { input } = useInput()
    const { blockJobs, inputErrors } = useInputErrors()
    const errorsModal = useModal(Modal)

    const [, setLocked] = useLockedBody(false)
    const [showResetConfirmModal, setShowResetConfirmModal] = useState(false)
    const [showDryRun, setShowDryRun] = useState(false)

    function areThereCriticalErrors() {
      return (
        Object.keys(errors || {}).some(
          (key) => errors[key] && Errors[key]?.blocksCreation
        )
      )
    }

    const showWarningButton = inputErrors && !blockJobs
    const showErrorsButton = inputErrors && blockJobs

    return (
      <>
        {showResetConfirmModal && (
          <DeleteConfirmModal
            deleteButtonText="Reset"
            onConfirmClick={() => {
              setLocked(false)
              resetInput()
              setShowResetConfirmModal(false)
            }}
            closeModal={() => {
              setLocked(false)
              setShowResetConfirmModal(false)
            }}
          >
            <h3 className="text-lg font-medium text-gray-900">Reset all settings?</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to reset all image generation parameters to default settings?
            </p>
          </DeleteConfirmModal>
        )}

        <div
          className={clsx(
            styles.CreateImageActionPanel,
            isFixed && styles.FixedPanel
          )}
          ref={ref}
        >
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-end gap-2">
              <Button
                title="Clear current input"
                size="small"
                theme="secondary"
                onClick={() => setShowResetConfirmModal(true)}
                className="py-2 px-4"
              >
                <IconTrash stroke={1.5} />
                <span className="hidden md:inline">Reset</span>
              </Button>

              <Button
                title="Create new image"
                onClick={handleSubmit}
                disabled={disableSubmit || pending || areThereCriticalErrors() || blockJobs}
                size="small"
                className="py-2 px-4"
              >
                {pending ? <span>Creating...</span> : <IconSquarePlus stroke={1.5} />}
                <span>{pending ? '' : 'Create'}</span>
              </Button>

              {showWarningButton && (
                <Button
                  className={clsx(styles.errorBtn, 'text-orange-600')}
                  onClick={() => errorsModal.show({
                    content: <ErrorsPanel inputErrors={inputErrors} />,
                    title: 'Validation Warnings',
                    maxWidth: 'max-w-lg'
                  })}
                >
                  <IconAlertTriangle stroke={1.5} />
                  Warnings
                </Button>
              )}

              {showErrorsButton && (
                <Button
                  className={clsx(styles.errorBtn, 'text-red-600')}
                  onClick={() => errorsModal.show({
                    content: <ErrorsPanel inputErrors={inputErrors} />,
                    title: 'Validation Errors',
                    maxWidth: 'max-w-lg'
                  })}
                >
                  <IconAlertTriangle stroke={1.5} />
                  Errors
                </Button>
              )}

              {loggedIn && (
                <Button
                  disabled={!input.prompt}
                  onClick={() => setShowDryRun(true)}
                  size="small"
                  className="py-2 px-4"
                >
                  <IconCalculator stroke={1.5} />
                </Button>
              )}

              {showDryRun && (
                <DropdownOptions
                  handleClose={() => setShowDryRun(false)}
                  title="Dry-run (kudos estimate)"
                  top="46px"
                >
                  <DryRunCalculator
                    input={input}
                    totalImagesRequested={totalImagesRequested}
                  />
                </DropdownOptions>
              )}
            </div>

            <div className="flex justify-end text-xs">
              <div className="flex flex-col text-right">
                <div className="mb-1">
                  Images to request: <strong>{totalImagesRequested}</strong>
                </div>

                {loggedIn && (
                  <>
                    <div className="mb-1">
                      Generation cost: <Linker href="/faq#kudos">{totalKudosCost} kudos</Linker>
                    </div>
                    <div>
                      Per image: <Linker href="/faq#kudos">{kudosPerImage} kudos</Linker>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
)

ActionPanel.displayName = 'ActionPanel'
export default ActionPanel
